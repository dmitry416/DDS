from django.shortcuts import render

def transactions(request, id=None):
    return render(request, 'transactions/transactions.html')