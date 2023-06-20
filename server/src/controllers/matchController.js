import { openDb } from "../config/connection";
import match from "../models/match.js";

class matchController{
      createMatch(){
        openDb().then(db => {
            db.exec('CREATE TABLE IF NOT EXISTS Match (id INTEGER PRIMARY KEY, rounds INTEGER, vencedor INTEGER, time_um INTEGER, time_dois,FOREIGN KEY(vencedor, time_um, time_dois) REFERENCES Time(id, id, id))');
        });
    }
    
    insertMatch(req, res){
        match.rounds = req.body.rounds;
        match.vencedor = req.body.vencedor;
        match.time_um = req.body.time_um;
        match.time_dois = req.body.time_dois;
        openDb().then(db => {
            db.run('INSERT INTO Match (rounds, vencedor, time_um, time_dois) VALUES (?, ?, ?, ?)', [match.rounds, match.vencedor, match.time_um, match.time_dois]);
        });
    
        res.json({
            "statusCode": 200,
            "message": "Success"
        });
    }
    
    updateMatch(req, res){
        match.rounds = req.body.rounds;
        match.vencedor = req.body.vencedor;
        match.time_um = req.body.time_um;
        match.time_dois = req.body.time_dois;
        match.id = req.body.id;
        openDb().then(db => {
            db.run('UPDATE Match SET rounds=?, vencedor=?, time_um=?, time_dois=? WHERE id=?', [match.rounds, match.vencedor, match.time_um, match.time_dois, match.id]);
        });
    
        res.json({
            "statusCode": 200,
            "message": "Success"
        });
    }
    
    selectMatches(req, res){
       return openDb().then(db => {
            return db.all('SELECT Match.id, Match.rounds,TimeVencedor.nome AS vencedor,TimeUm.nome AS time_um, TimeDois.nome AS time_dois FROM Match JOIN Time AS TimeVencedor ON Match.vencedor = TimeVencedor.id JOIN Time AS TimeUm ON match.time_um = TimeUm.id JOIN Time AS TimeDois ON Match.time_dois = TimeDois.id')    
                .then(matchs => res.json(matchs));
            });
    }
    
    selectMatch(req, res){
        match.id = req.body.id;
        return openDb().then(db => {
             return db.get('SELECT Match.id, Match.rounds,TimeVencedor.nome AS vencedor,TimeUm.nome AS time_um, TimeDois.nome AS time_dois FROM Match JOIN Time AS TimeVencedor ON Match.vencedor = TimeVencedor.id JOIN Time AS TimeUm ON Match.time_um = TimeUm.id JOIN Time AS TimeDois ON match.time_dois = TimeDois.id WHERE match.id=?', [match.id])
             .then(match => res.json(match));   
         });
     }
    
    deleteMatch(req, res){
        match.id = req.body.id;
        openDb().then(db => {
            db.get('DELETE FROM Match WHERE id=?', [match.id])
            .then(res => res);
         });
    
         res.json({
            "statusCode": 200,
            "message": "Success"
        });
     }
}

export default new matchController();