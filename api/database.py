import os
import tempfile

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

def _resolve_database_url() -> str:
    explicit_url = os.getenv("DATABASE_URL")
    if explicit_url:
        if explicit_url.startswith("postgres://"):
            explicit_url = explicit_url.replace("postgres://", "postgresql://", 1)
        return explicit_url

    if os.getenv("VERCEL"):
        temp_db_path = os.path.join(tempfile.gettempdir(), "bakukart.db")
        return f"sqlite:///{temp_db_path}"

    return "sqlite:///./bakukart.db"


SQLALCHEMY_DATABASE_URL = _resolve_database_url()

if SQLALCHEMY_DATABASE_URL.startswith("sqlite:///"):
    sqlite_path = SQLALCHEMY_DATABASE_URL.replace("sqlite:///", "", 1)
    sqlite_dir = os.path.dirname(sqlite_path)
    if sqlite_dir:
        os.makedirs(sqlite_dir, exist_ok=True)
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
else:
    engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()