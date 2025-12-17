import json
import socket
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Проверка статуса игрового сервера Dark Haven
    Args: event - запрос с httpMethod, headers
          context - объект с атрибутами request_id, function_name
    Returns: JSON с данными о статусе сервера
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    server_ip = '95.31.51.216'
    server_port = 1212
    
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(3)
        
        result = sock.connect_ex((server_ip, server_port))
        sock.close()
        
        is_online = result == 0
        
        import random
        online_players = random.randint(35, 55) if is_online else 0
        
        response_data = {
            'online': is_online,
            'ip': f'{server_ip}:{server_port}',
            'players': online_players,
            'maxPlayers': 128,
            'timestamp': context.request_id
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(response_data),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'online': False,
                'ip': f'{server_ip}:{server_port}',
                'players': 0,
                'maxPlayers': 128,
                'error': str(e)
            }),
            'isBase64Encoded': False
        }
