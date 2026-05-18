"""
Telegram Bot 连通性测试 — 从 .env 安全读取 Token，经代理访问 API。
"""
from __future__ import annotations

import asyncio
import logging
import os
import sys
from pathlib import Path

# ---------------------------------------------------------------------------
# Windows：尽早修复控制台 UTF-8，避免 emoji / 中文乱码
# ---------------------------------------------------------------------------
def _configure_windows_utf8() -> None:
    if sys.platform != "win32":
        return
    os.environ.setdefault("PYTHONUTF8", "1")
    for stream in (sys.stdout, sys.stderr):
        if hasattr(stream, "reconfigure"):
            try:
                stream.reconfigure(encoding="utf-8", errors="replace")
            except (OSError, ValueError):
                pass


_configure_windows_utf8()

from aiogram import Bot
from aiogram.client.session.aiohttp import AiohttpSession
from aiogram.exceptions import TelegramNetworkError, TelegramUnauthorizedError
from aiogram.utils.token import TokenValidationError, validate_token
from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parent
ENV_CANDIDATES = (ROOT / ".env", ROOT / "bot_token.env")
DEFAULT_PROXY = "http://127.0.0.1:7890"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-7s | %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger("bot_check")


def load_bot_token() -> str | None:
    """从 .env 或 bot_token.env 加载 BOT_TOKEN（不覆盖已存在的环境变量）。"""
    env_file = next((p for p in ENV_CANDIDATES if p.is_file()), None)
    if env_file is None:
        log.error("未找到配置文件（任选其一）: %s", ", ".join(p.name for p in ENV_CANDIDATES))
        log.info("请复制 .env.example 为 .env 并填写: BOT_TOKEN=123456789:AAHxxxxxxxx")
        return None

    loaded = load_dotenv(env_file, override=False)
    if not loaded:
        log.warning("dotenv 未解析到任何变量，请检查 %s 格式", env_file.name)

    token = os.getenv("BOT_TOKEN", "").strip()
    if not token:
        log.error("%s 中缺少 BOT_TOKEN 或值为空", env_file.name)
        return None

    log.info("已从 %s 读取 BOT_TOKEN（长度 %d，已脱敏）", env_file.name, len(token))
    return token


def resolve_proxy() -> str:
    proxy = os.getenv("PROXY_URL", DEFAULT_PROXY).strip() or DEFAULT_PROXY
    log.info("代理地址: %s", proxy)
    return proxy


def check_token_format(token: str) -> bool:
    try:
        validate_token(token)
        bot_id = token.split(":", 1)[0]
        log.info("Token 格式校验通过（Bot ID: %s）", bot_id)
        return True
    except TokenValidationError as exc:
        log.error("Token 格式无效: %s", exc)
        log.error("正确格式示例: 123456789:AAHxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
        return False


def explain_failure(exc: BaseException) -> str:
    if isinstance(exc, TokenValidationError):
        return "TOKEN_FORMAT"
    if isinstance(exc, TelegramUnauthorizedError):
        return "TOKEN_AUTH"
    if isinstance(exc, TelegramNetworkError):
        return "NETWORK"
    name = type(exc).__name__
    if name in ("ClientConnectorError", "ClientProxyConnectionError", "ConnectionError", "TimeoutError"):
        return "NETWORK"
    msg = str(exc).lower()
    if "unauthorized" in msg or "401" in msg:
        return "TOKEN_AUTH"
    if "connect" in msg or "timeout" in msg or "network" in msg or "proxy" in msg:
        return "NETWORK"
    return "UNKNOWN"


async def check_power() -> int:
    log.info("=== Telegram Bot 连通性测试 ===")

    token = load_bot_token()
    if not token:
        log.error("结论: 配置问题 — 请先配置 .env 中的 BOT_TOKEN")
        return 1

    if not check_token_format(token):
        log.error("结论: Token 格式错误 — 请向 BotFather 重新复制完整 Token")
        return 2

    proxy = resolve_proxy()
    session: AiohttpSession | None = None
    bot: Bot | None = None

    try:
        log.info("正在创建带代理的 HTTP 会话…")
        session = AiohttpSession(proxy=proxy)
        bot = Bot(token=token, session=session)

        log.info("正在请求 api.telegram.org/getMe …")
        me = await bot.get_me()

        log.info("认证成功")
        print(f"机器人名称: {me.first_name}")
        if me.username:
            print(f"用户名: @{me.username}")
        print(f"Bot ID: {me.id}")
        print("网络与 Token 均正常，可以开始后续开发。")
        return 0

    except RuntimeError as exc:
        if "aiohttp-socks" in str(exc):
            log.error("缺少代理依赖: pip install aiohttp-socks")
        log.error("结论: 环境依赖问题 — %s", exc)
        return 4

    except Exception as exc:
        kind = explain_failure(exc)
        log.exception("请求失败: %s", exc)

        if kind == "TOKEN_AUTH":
            log.error("结论: Token 认证失败 — Token 错误或已被 BotFather 撤销，请重新生成")
        elif kind == "NETWORK":
            log.error(
                "结论: 网络/代理不通 — 请确认 Clash/VPN 已开启，端口是否为 7890，"
                "或在 .env 中设置 PROXY_URL=http://127.0.0.1:你的端口"
            )
        elif kind == "TOKEN_FORMAT":
            log.error("结论: Token 格式错误")
        else:
            log.error("结论: 未知错误 — 请根据上方堆栈排查")

        return 3 if kind in ("TOKEN_AUTH", "TOKEN_FORMAT") else 5

    finally:
        if bot is not None:
            await bot.session.close()
        log.info("会话已关闭")


def main() -> None:
    code = asyncio.run(check_power())
    sys.exit(code)


if __name__ == "__main__":
    main()
