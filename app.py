from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/poema')
def poema():
    return render_template('poema.html')

@app.route('/sorpresa')
def sorpresa():
    return render_template('sorpresa.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
