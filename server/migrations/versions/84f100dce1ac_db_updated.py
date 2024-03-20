"""db updated

Revision ID: 84f100dce1ac
Revises: 930d3ac35540
Create Date: 2024-03-20 11:25:01.643635

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '84f100dce1ac'
down_revision = '930d3ac35540'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('audit', schema=None) as batch_op:
        batch_op.add_column(sa.Column('processPath', sa.String(length=100), nullable=False))
        batch_op.drop_column('process_path')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('audit', schema=None) as batch_op:
        batch_op.add_column(sa.Column('process_path', sa.VARCHAR(length=100), nullable=False))
        batch_op.drop_column('processPath')

    # ### end Alembic commands ###
