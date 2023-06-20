import { openDb } from "../config/connection.js";
import { openDb } from "../config/connection";
import Jogador from "../models/playerModel.js";

class PlayerController{
      createPlayer(){
        openDb().then(db => {
            db.exec('CREATE TABLE IF NOT EXISTS Jogador (id INTEGER PRIMARY KEY, nome TEXT, funcao TEXT, personagem TEXT, time_id INTEGER, FOREIGN KEY(time_id) REFERENCES Time(id))');
        });
    }
    
    insertPlayer(req, res){
        Jogador.nome = req.body.nome;
        Jogador.funcao = req.body.funcao;
        Jogador.personagem = req.body.personagem;
        Jogador.time_id = req.body.time_id;
        openDb().then(db => {
            db.run('INSERT INTO Jogador (nome, funcao, personagem, time_id) VALUES (?, ?, ?, ?)', [Jogador.nome, Jogador.funcao, Jogador.personagem, Jogador.time_id]);
        });
    
        res.json({
            "statusCode": 200,
            "message": "Success"
        });
    }
    
    updatePlayer(req, res){
        Jogador.nome = req.body.nome;
        Jogador.funcao = req.body.funcao;
        Jogador.personagem = req.body.personagem;
        Jogador.time_id = req.body.time_id; 
        Jogador.id = req.body.id;
        openDb().then(db => {
            db.run('UPDATE Jogador SET nome=?, funcao=?, personagem=?, time_id=? WHERE id=?', [Jogador.nome, Jogador.funcao, Jogador.personagem, Jogador.time_id, Jogador.id]); 
        });
    
        res.json({
            "statusCode": 200,
            "message": "Success"
        });
    }
    
    selectPlayers(req, res){
       return openDb().then(db => {
            return db.all('SELECT Jogador.id, Jogador.nome, Jogador.funcao, Jogador.personagem, Time.nome AS time FROM Jogador JOIN Time ON Jogador.time_id = Time.id')
            .then(jogadores => res.json(jogadores));
        });
    }
    
    selectPlayer(req, res){
        Jogador.id = req.body.id;   
        return openDb().then(db => {
             return db.get('SELECT Jogador.id, Jogador.nome, Jogador.funcao, Jogador.personagem, Time.nome AS time FROM Jogador JOIN Time ON Jogador.time_id = Time.id WHERE Jogador.id = ?', [Jogador.id])
             .then(jogador => res.json(jogador));
         });
     }
    
    deletePlayer(req, res){
        Jogador.id = req.body.id;
        openDb().then(db => {
            db.get('DELETE FROM Jogador WHERE id=?', [Jogador.id])
            .then(res => res);
         });
    
         res.json({
            "statusCode": 200,
            "message": "Success"
        });
     }
}

export default new PlayerController();