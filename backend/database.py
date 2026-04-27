import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

def _resolve_database_url() -> str:
    explicit_url = os.getenv("DATABASE_URL")
    if explicit_url:
        return explicit_url

    # Vercel functions run on a read-only filesystem except /tmp.
    if os.getenv("VERCEL"):
        return "sqlite:////tmp/bakukart.db"

    return "sqlite:///./bakukart.db"


SQLALCHEMY_DATABASE_URL = _resolve_database_url()

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
