from flask import Flask, request, jsonify 
import json 

app = Flask(__name__)

def fibonacci(n):
    if n <= 0:
        return "Input should be a positive integer"
    elif n == 1:
        return 0
    elif n == 2:
        return 1
    else:
        fibonacci(n-1) + fibonacci(n-2)

@app.route('/fibonacci', methods=['POST'])
def get_fibonacci():
    data = json.loads(request.data)
    num = data.get('number')
    if not isinstance(num, int) or num <= 0:
        return jsonify({'error': 'Invalid input'}), 400
    result = fibonacci(num)
    return jsonify({'seq': result})

if __name__ == '__main__':
    app.run(debug = True)

