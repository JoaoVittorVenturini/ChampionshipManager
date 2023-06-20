import { openDb } from "../config/connection";
import team from "../models/teamModel"

class TeamController{
    createTeam(){
        openDb().then(db => {
            db.exec('CREATE TABLE IF NOT EXISTS Team (id INTEGER PRIMARY KEY, nome TEXT, integrantes INTEGER, camp_jogados INTEGER, camp_vencidos INTEGER)');
        });
    }
    
    insertTeam(req, res){
        team.nome = req.body.nome;
        team.integrantes = req.body.integrantes;
        team.camp_jogados = req.body.camp_jogados;
        team.camp_vencidos = req.body.camp_vencidos;
        openDb().then(db => {
            db.run('INSERT INTO Team (nome, integrantes, camp_jogados, camp_vencidos) VALUES (?, ?, ?, ?)', [team.nome, team.integrantes, team.camp_jogados, team.camp_vencidos]);
        });
    
        res.json({
            "statusCode": 200
        });
    }
    
    updateTeam(req, res){
        team.nome = req.body.nome;
        team.integrantes = req.body.integrantes;
        team.camp_jogados = req.body.camp_jogados;
        team.camp_vencidos = req.body.camp_vencidos;
        team.id = req.body.id;
        openDb().then(db => {
            db.run('UPDATE Team SET nome=?, integrantes=?, camp_jogados=?,camp_vencidos=? WHERE id=?', [team.nome, team.integrantes, team.camp_jogados, team.camp_vencidos, time.id]);  
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
        team.id = req.body.id;
        return openDb().then(db => {
             return db.get('SELECT * FROM Team WHERE id=?', [team.id])
             .then(team => res.json(team));
         });
     }
    
    deleteTeam(req, res){
        team.id = req.body.id;
        openDb().then(db => {
            db.get('DELETE FROM Team WHERE id=?', [team.id])
            .then(res => res);
         });
    
         res.json({
            "statusCode": 200
        });
     }
}

export default new TeamController();