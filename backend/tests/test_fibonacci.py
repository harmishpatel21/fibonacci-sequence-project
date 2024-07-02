
import pytest
from app import app 
#
@pytest.fixture
def client():     
    with app.test_client() as client:
        yield client
#
def test_fibonacci_valid(client):
    response = client.post('/fibonacci', json={'number': 5})
    assert response.status_code == 200
    assert response.json['sequence'] == [0, 1, 1, 2, 3]
#
def test_fibonacci_invalid(client):
    response = client.post('/fibonacci', json={'number': -1})
    assert response.status_code == 400
    assert response.json['error'] == 'Invalid input'
