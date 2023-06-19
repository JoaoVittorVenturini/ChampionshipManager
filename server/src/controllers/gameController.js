import { openDb } from "../config/connection";
import game from "../models/game.js";

class GameController{
      createMatch(){
        openDb().then(db => {
            db.exec('CREATE TABLE IF NOT EXISTS Game (id INTEGER PRIMARY KEY, rounds INTEGER, vencedor INTEGER, time_um INTEGER, time_dois,FOREIGN KEY(vencedor, time_um, time_dois) REFERENCES Time(id, id, id))');
        });
    }
    
    insertMatch(req, res){
        game.rounds = req.body.rounds;
        game.vencedor = req.body.vencedor;
        game.time_um = req.body.time_um;
        game.time_dois = req.body.time_dois;
        openDb().then(db => {
            db.run('INSERT INTO Game (rounds, vencedor, time_um, time_dois) VALUES (?, ?, ?, ?)', [game.rounds, game.vencedor, game.time_um, game.time_dois]);
        });
    
        res.json({
            "statusCode": 200,
            "message": "Success"
        });
    }
    
    updateMatch(req, res){
        game.rounds = req.body.rounds;
        game.vencedor = req.body.vencedor;
        game.time_um = req.body.time_um;
        game.time_dois = req.body.time_dois;
        game.id = req.body.id;
        openDb().then(db => {
            db.run('UPDATE Game SET rounds=?, vencedor=?, time_um=?, time_dois=? WHERE id=?', [game.rounds, game.vencedor, game.time_um, game.time_dois, game.id]);
        });
    
        res.json({
            "statusCode": 200,
            "message": "Success"
        });
    }
    
    selectMatches(req, res){
       return openDb().then(db => {
            return db.all('SELECT Game.id, Game.rounds,TimeVencedor.nome AS vencedor,TimeUm.nome AS time_um, TimeDois.nome AS time_dois FROM Game JOIN Time AS TimeVencedor ON Game.vencedor = TimeVencedor.id JOIN Time AS TimeUm ON Game.time_um = TimeUm.id JOIN Time AS TimeDois ON Game.time_dois = TimeDois.id')    
                .then(games => res.json(games));
            });
    }
    
    selectMatch(req, res){
        game.id = req.body.id;
        return openDb().then(db => {
             return db.get('SELECT Game.id, Game.rounds,TimeVencedor.nome AS vencedor,TimeUm.nome AS time_um, TimeDois.nome AS time_dois FROM Game JOIN Time AS TimeVencedor ON Game.vencedor = TimeVencedor.id JOIN Time AS TimeUm ON Game.time_um = TimeUm.id JOIN Time AS TimeDois ON Game.time_dois = TimeDois.id WHERE Game.id=?', [game.id])
             .then(game => res.json(game));   
         });
     }
    
    deleteMatch(req, res){
        game.id = req.body.id;
        openDb().then(db => {
            db.get('DELETE FROM Game WHERE id=?', [game.id])
            .then(res => res);
         });
    
         res.json({
            "statusCode": 200,
            "message": "Success"
        });
     }
}

export default new GameController();