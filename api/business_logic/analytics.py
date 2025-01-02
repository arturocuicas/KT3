from sqlmodel import select, func

from db.tables.account_groups import AccountGroup
from db.tables.accounts import Account
from db.tables.entries import Entry

class AnalyticLogic:
    def __init__(self, session):
        self.session = session

    async def get_account_groups_totals(self):
        statement = select(AccountGroup)
        results = await self.session.exec(statement)

        account_groups = {
            str(result.id): {
                "name": result.name,
                "amount": 0
            } for result in results.all()
        }

        statement = select(Account)
        statement = statement.where(Account.account_group_id.in_(account_groups.keys()))
        results = await self.session.exec(statement)
        accounts = {str(result.id): str(result.account_group_id) for result in results.all()}

        statement = select(Entry.account_id, func.sum(Entry.amount).label('total_amount'))
        statement = statement.where(Entry.account_id.in_(accounts.keys()))
        statement = statement.group_by(Entry.account_id)
        results = await self.session.exec(statement)

        entries = {
            str(result.account_id): {
                "account_group_id": accounts[str(result.account_id)],
                "amount": result.total_amount
            } for result in results.all()
        }

        for entry in entries.values():
            account_groups[entry["account_group_id"]]["amount"] += entry["amount"]

        return account_groups

    async def get_accounts_totals(self):
        statement = select(Account)
        results = await self.session.exec(statement)

        accounts = {
            str(result.id): {
                "name": result.name,
                "amount": 0
            } for result in results.all()
        }

        statement = select(Entry.account_id, func.sum(Entry.amount).label('total_amount'))
        statement = statement.where(Entry.account_id.in_(accounts.keys()))
        statement = statement.group_by(Entry.account_id)
        results = await self.session.exec(statement)

        entries = {
            str(result.account_id): result.total_amount for result in results.all()
        }

        for account_id, amount in entries.items():
            accounts[account_id]["amount"] = amount

        return accounts
