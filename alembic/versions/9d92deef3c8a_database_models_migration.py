"""Database Models Migration

Revision ID: 9d92deef3c8a
Revises: a1ebbd117af2
Create Date: 2023-09-18 08:23:35.761986

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = '9d92deef3c8a'
down_revision: Union[str, None] = 'a1ebbd117af2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('resource', 'image',
               existing_type=mysql.VARCHAR(length=60),
               nullable=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('resource', 'image',
               existing_type=mysql.VARCHAR(length=60),
               nullable=False)
    # ### end Alembic commands ###
