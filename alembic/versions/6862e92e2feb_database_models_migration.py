"""Database Models Migration

Revision ID: 6862e92e2feb
Revises: 4e3d5e7af6b1
Create Date: 2023-09-13 12:23:28.193411

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6862e92e2feb'
down_revision: Union[str, None] = '4e3d5e7af6b1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('medicalarticle', sa.Column('content', sa.Text(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('medicalarticle', 'content')
    # ### end Alembic commands ###
