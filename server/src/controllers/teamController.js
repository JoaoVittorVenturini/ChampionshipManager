import { openDb } from "../config/connection.js";
import Team from "../models/teamModel.js"

class TeamController{
    createTeam(){
        openDb().then(db => {
            db.exec('CREATE TABLE IF NOT EXISTS Team (id INTEGER PRIMARY KEY, nome TEXT, integrantes INTEGER, camp_jogados INTEGER, camp_vencidos INTEGER)');
        });
    }
    
    insertTeam(req, res){
        Team.nome = req.body.nome;
        Team.integrantes = req.body.integrantes;
        Team.camp_jogados = req.body.camp_jogados;
        Team.camp_vencidos = req.body.camp_vencidos;
        openDb().then(db => {
            db.run('INSERT INTO Team (nome, integrantes, camp_jogados, camp_vencidos) VALUES (?, ?, ?, ?)', [Team.nome, Team.integrantes, Team.camp_jogados, Team.camp_vencidos]);
        });
    
        res.json({
            "statusCode": 200
        });
    }
    
    updateTeam(req, res){
        Team.nome = req.body.nome;
        Team.integrantes = req.body.integrantes;
        Team.camp_jogados = req.body.camp_jogados;
        Team.camp_vencidos = req.body.camp_vencidos;
        Team.id = req.body.id;
        openDb().then(db => {
            db.run('UPDATE Team SET nome=?, integrantes=?, camp_jogados=?,camp_vencidos=? WHERE id=?', [Team.nome, Team.integrantes, Team.camp_jogados, Team.camp_vencidos, Team.id]);  
        });
    
        res.json({
            "statusCode": 200
        });
    }
    
    selectTeams(req, res){
        return openDb().then(db => {
             return db.all('SELECT * FROM Team')
             .then(teams => res.json(teams));
         });
     }
    
    selectTeam(req, res){
        Team.id = req.body.id;
        return openDb().then(db => {
             return db.get('SELECT * FROM Team WHERE id=?', [Team.id])
             .then(team => res.json(team));
         });
     }
    
    deleteTeam(req, res){
        Team.id = req.body.id;
        openDb().then(db => {
            db.get('DELETE FROM Team WHERE id=?', [Team.id])
            .then(res => res);
         });
    
         res.json({
            "statusCode": 200
        });
     }
}

export default new TeamController();