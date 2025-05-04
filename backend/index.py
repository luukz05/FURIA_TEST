from flask import Flask, request, jsonify, make_response
from flask_pymongo import PyMongo
import bcrypt
import jwt
from flask_cors import CORS
from PIL import Image
import pytesseract
import re
from datetime import datetime, timezone, timedelta


app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["https://furiaqg.netlify.app/", "http://localhost:5173"])
app.config["MONGO_URI"] = "mongodb+srv://admin:admin@cluster0.atge3.mongodb.net/usuarios?retryWrites=true&w=majority"
mongo = PyMongo(app)

SECRET_KEY = "69420"  # Chave secreta para assinar os tokens JWT


# consumer_key = 'SbZWTfB6aTWa2dPM5HD8MzVMm'
# consumer_secret = '4rXioKPmZRNuuIaTPAukKZPiznDtaAd2BrdfkYXPXP3nbgIrdz'
# access_token = '1381568151280816243-zfrgHzXjzvshzASjIE1Qc0t8I7LOqz'
# access_token_secret = 'aKGQNDUnr7EGLsSaYrDcqoRvRg5ewuIETLjYTioo2Dm67'
# bearer_token = "AAAAAAAAAAAAAAAAAAAAAKeH0wEAAAAAsbAvvxSvfm2jsz9Uu4cnpgusZT8%3DKI6CHoSb2IkJA73zoiZ5ICmbEygi9zjwqfXr9csSP0uKMUxzzT"

#####################################################################

# Autenticando com a API do Twitter
# auth = tweepy.OAuth1UserHandler(
#    consumer_key, consumer_secret, access_token, access_token_secret
# )
# api = tweepy.API(auth)
# client = tweepy.Client(bearer_token=bearer_token)

# Teste da conexão
# try:
# user = api.verify_credentials()  # Verifica se as credenciais são válidas
# print(f"Conectado com sucesso! Bem-vindo, {user.name}")
# except tweepy.TweepError as e:
# print(f"Erro ao conectar ao Twitter: {e}")


# def get_user_id(username):
# user = client.get_user(username=username)
# return user.data.id


# Função para buscar os tweets mais recentes de um usuário
# def get_all_tweets(username, max_results=100, max_tweets=3200):
# user_id = get_user_id(username)
# all_tweets = []
# next_token = None

# while len(all_tweets) < max_tweets:
# try:
# Realiza a requisição para pegar tweets do usuário
# response = client.get_users_tweets(id=user_id, max_results=max_results, pagination_token=next_token)

# if response.data:
#     all_tweets.extend(response.data)  # Adiciona os tweets à lista

# Atualiza o token de paginação para a próxima requisição
#    next_token = response.meta.get('next_token')
#     print(f"Obtidos {len(response.data)} tweets de @{username}. Total: {len(all_tweets)}")
#  else:
#      print(f"Nenhum tweet encontrado para @{username}.")
#      break

# Se o token de paginação for None, significa que não há mais tweets para carregar
#  if not next_token:
#      break

# except tweepy.TooManyRequests as e:
#      # Espera o tempo correto antes de fazer a nova requisição
#      reset_time = int(e.response.headers.get('x-rate-limit-reset'))
#     wait_time = reset_time - time.time()
#     print(f"Limite de requisições atingido. Esperando {wait_time} segundos.")
#     time.sleep(wait_time)  # Aguarda até o próximo reset

#  print(f"Total de tweets obtidos: {len(all_tweets)}")

#  return all_tweets


# Função para filtrar os tweets que contêm a palavra "FURIA"
# def filter_tweets_by_keyword(tweets, keyword="FURIA"):
#    filtered_tweets = [tweet for tweet in tweets if keyword.lower() in tweet.text.lower()]
#    print(f"Encontrados {len(filtered_tweets)} tweets contendo a palavra '{keyword}'.")
#    return filtered_tweets


# @app.route('/consultaPosts', methods=['POST'])
# def consulta_posts():
#    data = request.get_json()
#    username = data.get('username')
#    keyword = data.get('keyword', 'FURIA')  # Se não enviar, padrão é "FURIA"
#
#    if not username:
#       return jsonify({"message": "Username é obrigatório"}), 400
#
# Pega os tweets
#   try:
#        tweets = get_all_tweets(username, max_results=100, max_tweets=3200)
#   except Exception as e:
#       return jsonify({"message": f"Erro ao buscar tweets: {str(e)}"}), 500

# Filtra pelos tweets com a palavra-chave
#    filtered_tweets = filter_tweets_by_keyword(tweets, keyword)

# Prepara resposta
#   result = []
#   for tweet in filtered_tweets:
#       result.append({
#          "id": tweet.id,
#           "text": tweet.text
#       })

#  return jsonify({
#      "message": f"{len(filtered_tweets)} tweets encontrados contendo a palavra '{keyword}'",
#      "tweets": result
#  }), 200

@app.route('/messages/global', methods=['POST'])
def send_message():
    data = request.get_json()
    sender_name = data.get("senderName")
    sender_id = data.get("senderId")
    content = data.get("content")

    if not sender_id or not content:
        return jsonify({"error": "Campos obrigatórios faltando"}), 400

    # Criando a mensagem e salvando no MongoDB
    message_data = {
        "sender_id": sender_id,
        "sender_name": sender_name,
        "content": content,
        "timestamp": datetime.utcnow()
    }

    # Salvando a mensagem no MongoDB
    mongo.db.messages.insert_one(message_data)

    return jsonify({
        "message": "Mensagem enviada com sucesso!",
        "data": message_data
    }), 201


# Rota para obter todas as mensagens globais
@app.route('/messages/global', methods=['GET'])
def get_messages():
    try:
        # Recuperando todas as mensagens da coleção 'messages', ordenadas por timestamp
        messages = mongo.db.messages.find({}).sort("timestamp", 1)

        # Convertendo as mensagens para lista de dicionários
        messages_list = []
        for msg in messages:
            msg['_id'] = str(msg['_id'])  # Convertendo o ObjectId para string
            if 'timestamp' in msg and isinstance(msg['timestamp'], datetime):
                msg['timestamp'] = msg['timestamp'].isoformat()
            messages_list.append(msg)

        return jsonify(messages_list), 200
    except Exception as e:
        return jsonify({"error": "Erro ao buscar mensagens: " + str(e)}), 500


@app.route('/quiz/<cpf>', methods=['PATCH'])
def registrar_quiz(cpf):
    data = request.json

    # Verifica se score foi enviado
    if 'acertos' not in data:
        return jsonify({"message": "Campo 'acertos' é obrigatório."}), 400

    # Verifica se usuário existe
    user = mongo.db.users.find_one({"cpf": cpf})
    if not user:
        return jsonify({"message": "Usuário não encontrado."}), 404

    nova_entrada = {
        "data": datetime.utcnow().strftime("%Y-%m-%d"),
        "acertos": data["acertos"]
    }

    # Adiciona entrada ao array 'quiz'
    mongo.db.users.update_one(
        {"cpf": cpf},
        {"$push": {"quiz": nova_entrada}}
    )

    return jsonify({"message": "Tentativa de quiz registrada com sucesso!"}), 200


@app.route('/verify/<cpf>', methods=['PATCH'])
def verify_user(cpf):
    # Verifica se o usuário existe
    user = mongo.db.users.find_one({"cpf": cpf})
    if not user:
        return jsonify({"message": "Usuário não encontrado."}), 404

    # Atualiza verified para True, adiciona 50 de experiência e 15 moedas
    if not user.get("verified", False):
        mongo.db.users.update_one(
            {"cpf": cpf},
            {

                "$set": {"verified": True},
                "$inc": {"experiencia": 50, "moedas": 15}
            }
        )
        return jsonify({"message": "Usuário verificado com sucesso!"}), 200
    else:
        return jsonify({"message": "Usuário já está verificado."}), 200

# Função para criar token JWT
def create_token(user_id):
    expiration_time = datetime.now(timezone.utc) + timedelta(hours=1)

    return jwt.encode({"user_id": str(user_id), "exp": expiration_time}, SECRET_KEY, algorithm="HS256")


pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'  # Ajuste o caminho conforme necessário

@app.route('/', methods=['GET'])
def hello_world():
    return 'Hello, World!'



# Rota de Registro
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    full_name = data.get('fullName')
    email = data.get('email')
    password = data.get('password')
    address = data.get('address')
    cpf = data.get('cpf')

    if not all([full_name, email, password, address, cpf]):
        return jsonify({"message": "Todos os campos são obrigatórios."}), 400

    existing_user = mongo.db.users.find_one({"email": email})
    if existing_user:
        return jsonify({"message": "Este email já está registrado."}), 400

    # Criação do hash da senha
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Inserir no banco de dados
    mongo.db.users.insert_one({
        "fullName": full_name,
        "email": email,
        "password": hashed_password,
        "address": address,
        "cpf": cpf,
        "moedas": 0,
        "experiencia": 0,
    })

    return jsonify({"message": "Usuário registrado com sucesso!"}), 201


# Rota de Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    cpf = data.get('cpf')
    password = data.get('password')

    user = mongo.db.users.find_one({"cpf": cpf})
    if not user:
        return jsonify({"message": "Usuário não encontrado."}), 404

    # Verificar senha
    if not bcrypt.checkpw(password.encode('utf-8'), user['password']):
        return jsonify({"message": "Senha incorreta."}), 400

    # Criar e salvar o token
    token = create_token(user['_id'])

    # Armazenar o token na sessão do banco de dados
    mongo.db.sessions.insert_one({
        "user_id": user['_id'],
        "token": token,
        "created_at": datetime.utcnow()
    })

    # Enviar o token como cookie HTTPOnly
    response = make_response(jsonify({"message": "Login bem-sucedido", "token": token}), 200)
    return response


@app.route('/socials/<cpf>', methods=['PATCH'])
def update_socials(cpf):
    # Atualiza redes sociais do usuário
    user = mongo.db.users.find_one({"cpf": cpf})
    if not user:
        return jsonify({"message": "Usuário não encontrado."}), 404

    data = request.get_json()
    socials = data.get('socials')
    if not socials:
        return jsonify({"message": "As redes sociais não foram fornecidas."}), 400

    mongo.db.users.update_one(
        {"cpf": cpf},
        {"$set": {"socials": socials}}
    )

    updated_user = mongo.db.users.find_one({"cpf": cpf})
    return jsonify({
        "message": "Redes sociais atualizadas com sucesso!",
        "user": {
            "fullName": updated_user["fullName"],
            "email": updated_user["email"],
            "socials": updated_user.get("socials", {})
        }
    }), 200


@app.route('/users/<cpf>', methods=['PATCH'])
def update_interests(cpf):
    # Atualiza interesses do usuário
    user = mongo.db.users.find_one({"cpf": cpf})
    if not user:
        return jsonify({"message": "Usuário não encontrado."}), 404

    data = request.get_json()
    interests = data.get('interests')
    if not interests:
        return jsonify({"message": "Os interesses não foram fornecidos."}), 400

    mongo.db.users.update_one(
        {"cpf": cpf},
        {"$set": {"interests": interests}}
    )

    updated_user = mongo.db.users.find_one({"cpf": cpf})
    return jsonify({
        "message": "Interesses atualizados com sucesso!",
        "user": {
            "fullName": updated_user["fullName"],
            "email": updated_user["email"],
            "interests": updated_user.get("interests", [])
        }
    }), 200


@app.route('/user/<cpf>', methods=['GET'])
def get_user_by_cpf(cpf):
    # Procurando o usuário no banco de dados com o CPF fornecido
    user = mongo.db.users.find_one({"cpf": cpf})

    if not user:
        return jsonify({"message": "Usuário não encontrado."}), 404

    # Extraindo os dados diretamente do documento retornado pelo Mongo
    user_data = {
        "fullName": user.get("fullName", ""),
        "cpf": user.get("cpf", ""),
        "email": user.get("email", ""),
        "address": user.get("address", ""),
        "interests": user.get("interests", ""),
        "socials": user.get("socials", ""),
        "moedas": user.get("moedas"),
        "experiencia": user.get("experiencia"),
        "verified": user.get("verified"),
        "quiz": user.get("quiz", [])[-1] if user.get("quiz") else None,  # Último item do array 'quiz'
    }

    return jsonify(user_data), 200




@app.route('/ranking', methods=['GET'])
def get_ranking():
    try:
        # Busca todos os usuários e ordena apenas por experiencia (ordem decrescente)
        users_cursor = mongo.db.users.find({}, {
            "fullName": 1,
            "moedas": 1,
            "experiencia": 1,
            "_id": 0
        }).sort("experiencia", -1)

        users = list(users_cursor)

        return jsonify({"ranking": users}), 200
    except Exception as e:
        return jsonify({"message": f"Erro ao obter ranking: {str(e)}"}), 500


def extract_numbers_from_image(image):
    # Abre a imagem com o PIL
    img = Image.open(image)
    # Usa pytesseract para extrair o texto da imagem
    extracted_text = pytesseract.image_to_string(img)

    # Usa expressão regular para extrair todos os números da string extraída
    numbers = re.findall(r'\d{3}\.\d{3}\.\d{3}-\d{2}', extracted_text)

    return numbers


@app.route('/ocr', methods=['POST'])
def ocr():
    if 'image' not in request.files:
        return jsonify({'error': 'Imagem não encontrada'}), 400

    image = request.files['image']

    # Extrair números da imagem
    extracted_numbers = extract_numbers_from_image(image)

    # Print para ver a lista de números extraídos
    print(f"Texto extraído: {extracted_numbers}")

    return jsonify({'extracted_numbers': extracted_numbers})


# Rota de Logout
@app.route('/logout', methods=['POST'])
def logout():
    token = request.cookies.get('session_token')
    if not token:
        return jsonify({"message": "Nenhuma sessão ativa encontrada"}), 400

    # Invalidar a sessão no MongoDB
    mongo.db.sessions.delete_one({"token": token})

    # Remover o cookie
    response = make_response(jsonify({"message": "Logout bem-sucedido"}), 200)
    response.delete_cookie('session_token')
    return response


if __name__ == '__main__':
    app.run(debug=True)
