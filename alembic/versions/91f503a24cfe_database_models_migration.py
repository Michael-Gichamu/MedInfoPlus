"""Database Models Migration

Revision ID: 91f503a24cfe
Revises: 4c11257bff67
Create Date: 2023-09-13 08:03:03.674269

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = '91f503a24cfe'
down_revision: Union[str, None] = '4c11257bff67'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('email', table_name='newsletter')
    op.drop_table('newsletter')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('newsletter',
    sa.Column('email', mysql.VARCHAR(length=120), nullable=False),
    sa.Column('id', mysql.VARCHAR(length=60), nullable=False),
    sa.Column('created_at', mysql.DATETIME(), nullable=True),
    sa.Column('updated_at', mysql.DATETIME(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_index('email', 'newsletter', ['email'], unique=False)
    # ### end Alembic commands ###