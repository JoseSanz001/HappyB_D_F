from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/poema')
def poema():
    # Poema (puedes editar aquí o en la plantilla)
    lines = [
        "En el cielo de mi vida eres la estrella más clara,",
        "tu risa enciende constelaciones nuevas en mi alma.",
        "Hoy celebro tu existencia, tu luz y tu magia,",
        "feliz cumpleaños, mi amor, mi calma y mi coraza."
    ]
    return render_template('poema.html', lines=lines)

@app.route('/sorpresa')
def sorpresa():
    return render_template('sorpresa.html')

if __name__ == '__main__':
    app.run(debug=True)
