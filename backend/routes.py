from flask import request, jsonify
from app import app, db
from models import User, People, Planet, Favorite

# Simulación de usuario actual (el primero de la base de datos)
def get_current_user():
    return User.query.first()

@app.route('/people', methods=['GET'])
def get_people():
    people = People.query.all()
    return jsonify([p.serialize() for p in people])

@app.route('/people/<int:people_id>', methods=['GET'])
def get_person(people_id):
    person = People.query.get_or_404(people_id)
    return jsonify(person.serialize())

@app.route('/planets', methods=['GET'])
def get_planets():
    planets = Planet.query.all()
    return jsonify([p.serialize() for p in planets])

@app.route('/planets/<int:planet_id>', methods=['GET'])
def get_planet(planet_id):
    planet = Planet.query.get_or_404(planet_id)
    return jsonify(planet.serialize())

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([u.serialize() for u in users])

@app.route('/users/favorites', methods=['GET'])
def get_user_favorites():
    user = get_current_user()
    if not user:
        return jsonify({'msg': 'No hay usuario actual'}), 404
    favorites = Favorite.query.filter_by(user_id=user.id).all()
    return jsonify([f.serialize() for f in favorites])

@app.route('/favorite/planet/<int:planet_id>', methods=['POST'])
def add_favorite_planet(planet_id):
    user = get_current_user()
    if not user:
        return jsonify({'msg': 'No hay usuario actual'}), 404
    favorite = Favorite(user_id=user.id, planet_id=planet_id)
    db.session.add(favorite)
    db.session.commit()
    return jsonify(favorite.serialize()), 201

@app.route('/favorite/people/<int:people_id>', methods=['POST'])
def add_favorite_people(people_id):
    user = get_current_user()
    if not user:
        return jsonify({'msg': 'No hay usuario actual'}), 404
    favorite = Favorite(user_id=user.id, people_id=people_id)
    db.session.add(favorite)
    db.session.commit()
    return jsonify(favorite.serialize()), 201

@app.route('/favorite/planet/<int:planet_id>', methods=['DELETE'])
def delete_favorite_planet(planet_id):
    user = get_current_user()
    if not user:
        return jsonify({'msg': 'No hay usuario actual'}), 404
    favorite = Favorite.query.filter_by(user_id=user.id, planet_id=planet_id).first()
    if not favorite:
        return jsonify({'msg': 'Favorito no encontrado'}), 404
    db.session.delete(favorite)
    db.session.commit()
    return jsonify({'msg': 'Favorito eliminado'})

@app.route('/favorite/people/<int:people_id>', methods=['DELETE'])
def delete_favorite_people(people_id):
    user = get_current_user()
    if not user:
        return jsonify({'msg': 'No hay usuario actual'}), 404
    favorite = Favorite.query.filter_by(user_id=user.id, people_id=people_id).first()
    if not favorite:
        return jsonify({'msg': 'Favorito no encontrado'}), 404
    db.session.delete(favorite)
    db.session.commit()
    return jsonify({'msg': 'Favorito eliminado'}) 