import { openDb } from "../config/connection.js";
import Time from "../models/teamModel.js";

class TeamController{
    createTeam(){
        openDb().then(db => {
            db.exec('CREATE TABLE IF NOT EXISTS Time (id INTEGER PRIMARY KEY, nome TEXT, integrantes INTEGER, camp_jogados INTEGER, camp_vencidos INTEGER)');
        });
    }
    
    insertTeam(req, res){
        Time.nome = req.body.nome;
        Time.integrantes = req.body.integrantes;
        Time.camp_jogados = req.body.camp_jogados;
        Time.camp_vencidos = req.body.camp_vencidos;
        openDb().then(db => {
            db.run('INSERT INTO Time (nome, integrantes, camp_jogados, camp_vencidos) VALUES (?, ?, ?, ?)', [Time.nome, Time.integrantes, Time.camp_jogados, Time.camp_vencidos]);
        });
    
        res.json({
            "statusCode": 200
        });
    }
    
    updateTeam(req, res){
        Time.nome = req.body.nome;
        Time.integrantes = req.body.integrantes;
        Time.camp_jogados = req.body.camp_jogados;
        Time.camp_vencidos = req.body.camp_vencidos;
        Time.id = req.body.id;
        openDb().then(db => {
            db.run('UPDATE Time SET nome=?, integrantes=?, camp_jogados=?,camp_vencidos=? WHERE id=?', [Time.nome, Time.integrantes, Time.camp_jogados, Time.camp_vencidos, Time.id]);  
        });
    
        res.json({
            "statusCode": 200
        });
    }
    
    selectTeams(req, res){
        return openDb().then(db => {
             return db.all('SELECT * FROM Time')
             .then(times => res.json(times));
         });
     }
    
    selectTeam(req, res){
        Time.id = req.body.id;
        return openDb().then(db => {
             return db.get('SELECT * FROM Time WHERE id=?', [Time.id])
             .then(time => res.json(time));
         });
     }
    
    deleteTeam(req, res){
        Time.id = req.body.id;
        openDb().then(db => {
            db.get('DELETE FROM Time WHERE id=?', [Time.id])
            .then(res => res);
         });
    
         res.json({
            "statusCode": 200
        });
     }
}

export default new TeamController();