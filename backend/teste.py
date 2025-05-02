import requests
from bs4 import BeautifulSoup

def get_hltv_data(player_url):
    try:
        response = requests.get(player_url)
        soup = BeautifulSoup(response.text, 'html.parser')

        # Nome do jogador
        player_name = soup.find('h1', class_='playerNickname').text

        # Time do jogador
        team = soup.find('div', class_='team-logo').img['alt']

        print("Nome do Jogador:", player_name)
        print("Time:", team)

    except Exception as e:
        print(f"Erro: {e}")

# Exemplo de uso
player_url = 'https://www.hltv.org/profile/1462414/luukz'  # Substitua pelo link do jogador
get_hltv_data(player_url)
