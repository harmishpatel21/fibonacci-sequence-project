
from flask import Flask, request, jsonify
from flask_cors import CORS 
import json

app = Flask(__name__)
CORS(app)

def fibonacci(n):
    sequence = [0, 1]
    while len(sequence) <= n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence[:n]

@app.route('/fibonacci', methods=['POST'])
def get_fibonacci():
    data = json.loads(request.data)
    num = data.get('number')
    
    if not isinstance(num, int) or num <= 0:
        return jsonify({'error': 'Invalid input'}), 400
    result = fibonacci(num)
    return jsonify({'sequence': result})

if __name__ == '__main__':
    app.run(debug=True)

