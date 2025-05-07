let vittorie1 = 0, pareggi1 = 0, sconfitte1 = 0;
let vittorie2 = 0, pareggi2 = 0, sconfitte2 = 0;
let teamsByCompetition = {};
let selectedTeamSlot = null;
let logoImage1 = null;
let logoImage2 = null;


document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    const competitionSelect = document.getElementById('competition-select');
    const teamSelect = document.getElementById('team-select');
    const confirmBtn = document.getElementById('confirm-selection');

    const team1NameDisplay = document.getElementById('team-name-1');
    const team2NameDisplay = document.getElementById('team-name-2');
   

    fetch('https://calcio.onrender.com/teams-by-competition')
        .then(res => res.json())
        .then(data => {
            teamsByCompetition = data;
            for (const compId in data) {
                const option = document.createElement('option');
                option.value = compId;
                option.textContent = getCompName(compId);
                competitionSelect.appendChild(option);
            }
        });

    document.querySelectorAll('.select-button').forEach(button => {
        button.addEventListener('click', () => {
            selectedTeamSlot = button.dataset.team;
            modal.style.display = 'block';
            // 🧹 PULIZIA COMPLETA
        document.getElementById('results-1').innerHTML = '';
        document.getElementById('results-2').innerHTML = '';
        document.getElementById('goal-summary-1').innerHTML = '';
        document.getElementById('goal-summary-2').innerHTML = '';
        document.getElementById('goal-conceded-summary-1').innerHTML = '';
        document.getElementById('goal-conceded-summary-2').innerHTML = '';
        document.getElementById('total-goals-summary-1').innerHTML = '';
        document.getElementById('total-goals-summary-2').innerHTML = '';
        document.getElementById('team-summary-1').innerHTML = '';
        document.getElementById('team-summary-2').innerHTML = '';
        document.getElementById('team-name-1').textContent = '';
        document.getElementById('team-name-2').textContent = '';
        document.getElementById('team-name-1').style.display = 'none';
        document.getElementById('team-name-2').style.display = 'none';
        document.getElementById('results-1').style.display = 'none';
        document.getElementById('results-2').style.display = 'none';
        document.getElementById('team-logo-1').style.display = 'none';
      document.getElementById('team-logo-2').style.display = 'none';
      document.getElementById('standings-button-1').style.display = 'none';
      document.getElementById('standings-button-2').style.display = 'none';



       
        });
    });

    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };

    competitionSelect.addEventListener('change', () => {
        const compId = competitionSelect.value;
        teamSelect.innerHTML = '<option value="">Seleziona Squadra</option>';
        if (teamsByCompetition[compId]) {
            teamsByCompetition[compId].forEach(team => {
                const option = document.createElement('option');
                option.value = team.name;
                option.textContent = team.name;
                teamSelect.appendChild(option);
            });
        }
    });

    confirmBtn.addEventListener('click', () => {
        const selectedName = teamSelect.value;
        const competitionId = competitionSelect.value;
      
        if (!selectedName || !competitionId) return;
      
        const selectedTeam = teamsByCompetition[competitionId].find(team => team.name === selectedName);
        if (!selectedTeam) return;
      
        if (selectedTeamSlot === '1') {
            team1NameDisplay.textContent = selectedTeam.name;
            team1NameDisplay.dataset.name = selectedTeam.name;
            team1NameDisplay.dataset.id = selectedTeam.id;
            team1NameDisplay.dataset.competitionId = competitionId;
            document.getElementById('selected-name-1').textContent = selectedTeam.name;
          } else {
            team2NameDisplay.textContent = selectedTeam.name;
            team2NameDisplay.dataset.name = selectedTeam.name;
            team2NameDisplay.dataset.id = selectedTeam.id;
            team2NameDisplay.dataset.competitionId = competitionId;
            document.getElementById('selected-name-2').textContent = selectedTeam.name;
          }
      
        modal.style.display = 'none';
      });
      


    document.getElementById('search-button').addEventListener('click', () => {
        const teamName1 = team1NameDisplay.dataset.name;
        const teamName2 = team2NameDisplay.dataset.name;
    
        if (!teamName1 || !teamName2) {
            alert("Seleziona entrambe le squadre");
            return;
        }
    
        const loadingElement = document.getElementById('loading-indicator');
        loadingElement.style.display = 'block'; // 👈 MOSTRA IL CARICAMENTO
    










        const teamId1 = team1NameDisplay.dataset.id;
        const compId1 = team1NameDisplay.dataset.competitionId;
        
        const teamId2 = team2NameDisplay.dataset.id;
        const compId2 = team2NameDisplay.dataset.competitionId;
        
        // 🔁 Logo squadra 1
        let classificaVisibile1 = false;

fetch(`https://calcio.onrender.com/standings/${compId1}`)
  .then(res => res.json())
  .then(data => {
    const entry = data.standings[0].table.find(e => e.team.id.toString() === teamId1);
    const fullTable = data.standings[0].table;

    if (entry) {
      const logo1 = document.getElementById('team-logo-1');
      logo1.src = entry.team.crest;
      logoImage1 = new Image();
      logoImage1.src = entry.team.crest;
      logo1.alt = `${entry.team.name} crest`;
      logo1.style.display = 'block';

      const btn = document.getElementById('standings-button-1');
      btn.style.display = 'block';
      btn.onclick = () => {
        const container = document.getElementById('standings-info-1');
        if (classificaVisibile1) {
          container.innerHTML = '';
          classificaVisibile1 = false;
        } else {
          let html = `<table class="standings-table">
            <tr><th>#</th><th>Squadra</th><th>Punti</th></tr>`;
            fullTable.forEach(team => {
                const isSelected = team.team.id.toString() === teamId1;
                html += `<tr${isSelected ? ' class="standings-highlight"' : ''}>
                  <td>${team.position}</td>
                  <td>${team.team.name}</td>
                  <td>${team.points}</td>
                </tr>`;
              });
              
          html += `</table>`;
          container.innerHTML = html;
          classificaVisibile1 = true;
        }
      };
    }
  });


      
        
        // 🔁 Logo squadra 2
        let classificaVisibile2 = false;

fetch(`https://calcio.onrender.com/standings/${compId2}`)
  .then(res => res.json())
  .then(data => {
    const entry = data.standings[0].table.find(e => e.team.id.toString() === teamId2);
    const fullTable = data.standings[0].table;

    if (entry) {
      const logo2 = document.getElementById('team-logo-2');
      logo2.src = entry.team.crest;
      logoImage2 = new Image();
      logoImage2.src = entry.team.crest;
      logo2.alt = `${entry.team.name} crest`;
      logo2.style.display = 'block';

      const btn = document.getElementById('standings-button-2');
      btn.style.display = 'block';
      btn.onclick = () => {
        const container = document.getElementById('standings-info-2');
        if (classificaVisibile2) {
          container.innerHTML = '';
          classificaVisibile2 = false;
        } else {
          let html = `<table class="standings-table">
            <tr><th>#</th><th>Squadra</th><th>Punti</th></tr>`;
            fullTable.forEach(team => {
                const isSelected = team.team.id.toString() === teamId2;
                html += `<tr${isSelected ? ' class="standings-highlight"' : ''}>
                  <td>${team.position}</td>
                  <td>${team.team.name}</td>
                  <td>${team.points}</td>
                </tr>`;
              });
              
          html += `</table>`;
          container.innerHTML = html;
          classificaVisibile2 = true;
        }
      };
    }
  });


        




// 🧹 PULISCI TUTTO PRIMA DI CARICARE NUOVI DATI
document.getElementById('results-1').innerHTML = '';
document.getElementById('results-2').innerHTML = '';
document.getElementById('goal-summary-1').innerHTML = '';
document.getElementById('goal-summary-2').innerHTML = '';
document.getElementById('goal-conceded-summary-1').innerHTML = '';
document.getElementById('goal-conceded-summary-2').innerHTML = '';
document.getElementById('total-goals-summary-1').innerHTML = '';
document.getElementById('total-goals-summary-2').innerHTML = '';
document.getElementById('team-summary-1').innerHTML = '';
document.getElementById('team-summary-2').innerHTML = '';
document.getElementById('team-name-1').textContent = '';
document.getElementById('team-name-2').textContent = '';
document.getElementById('selected-name-1').textContent = '';
document.getElementById('selected-name-2').textContent = '';
document.getElementById('team-logo-1').style.display = 'none';
document.getElementById('team-logo-2').style.display = 'none';
document.getElementById('team-name-1').style.display = 'none';
document.getElementById('team-name-2').style.display = 'none';
document.getElementById('results-1').style.display = 'none';
document.getElementById('results-2').style.display = 'none';
document.getElementById('team-name-1').textContent = teamName1;
document.getElementById('team-name-2').textContent = teamName2;
document.getElementById('standings-button-1').style.display = 'none';
document.getElementById('standings-button-2').style.display = 'none';



















































        fetch(`https://calcio.onrender.com/get-matches-dual?teamName1=${encodeURIComponent(teamName1)}&teamName2=${encodeURIComponent(teamName2)}`)
            .then(res => res.json())
            .then(data => {
                // 🔁 TUTTO IL TUO CODICE ORIGINALE QUI (NON TOCCARE NULLA)
                document.getElementById('team-name-1').style.display = 'block';
                document.getElementById('team-name-2').style.display = 'block';
                document.getElementById('results-1').style.display = 'block';
                document.getElementById('results-2').style.display = 'block';
     
        
    
        // Riepilogo V/X/P
        const resultStats1 = calculateMatchResults(data.team1Matches, teamName1);
        const resultStats2 = calculateMatchResults(data.team2Matches, teamName2);



        const total1 = resultStats1.win + resultStats1.draw + resultStats1.loss;
const total2 = resultStats2.win + resultStats2.draw + resultStats2.loss;

vittorie1 = total1 ? (resultStats1.win / total1) * 100 : 0;
pareggi1 = total1 ? (resultStats1.draw / total1) * 100 : 0;
sconfitte1 = total1 ? (resultStats1.loss / total1) * 100 : 0;

vittorie2 = total2 ? (resultStats2.win / total2) * 100 : 0;
pareggi2 = total2 ? (resultStats2.draw / total2) * 100 : 0;
sconfitte2 = total2 ? (resultStats2.loss / total2) * 100 : 0;

        
    
        // Gol segnati
        const goalCounts1 = analyzeGoalCounts(data.team1Matches, teamName1);
        const goalCounts2 = analyzeGoalCounts(data.team2Matches, teamName2);
        displayGoalSummary(goalCounts1, teamName1, document.getElementById('goal-summary-1'), data.team1Matches);
        displayGoalSummary(goalCounts2, teamName2, document.getElementById('goal-summary-2'), data.team2Matches);
    
        // ➕ Ora inseriamo la tabella V/X/P DOPO i gol segnati (così non viene sovrascritta)
        displayMatchResultSummary(resultStats1, teamName1, document.getElementById('goal-summary-1'));
        displayMatchResultSummary(resultStats2, teamName2, document.getElementById('goal-summary-2'));
    
        // Gol subiti
        const concededCounts1 = analyzeGoalsConceded(data.team1Matches, teamName1);
        const concededCounts2 = analyzeGoalsConceded(data.team2Matches, teamName2);
        displayGoalConcededSummary(concededCounts1, teamName1, document.getElementById('goal-conceded-summary-1'), data.team1Matches);
        displayGoalConcededSummary(concededCounts2, teamName2, document.getElementById('goal-conceded-summary-2'), data.team2Matches);
    
        // Gol totali
        const totalGoals1 = analyzeTotalGoals(data.team1Matches);
        const totalGoals2 = analyzeTotalGoals(data.team2Matches);
        displayTotalGoalsSummary(totalGoals1, teamName1, document.getElementById('total-goals-summary-1'));
        displayTotalGoalsSummary(totalGoals2, teamName2, document.getElementById('total-goals-summary-2'));
    
        // Risultati esatti
        const exact1 = getExactScoreFrequencies(data.team1Matches);
        const exact2 = getExactScoreFrequencies(data.team2Matches);       
        displayExactScoresGrid(exact1, document.getElementById('total-goals-summary-1'));
        displayExactScoresGrid(exact2, document.getElementById('total-goals-summary-2'));

        //under 0,5
        const underOverStats1 = getUnderOver05Summary(data.team1Matches);
        const underOverStats2 = getUnderOver05Summary(data.team2Matches);
        
        displayUnderOver05Table(underOverStats1, teamName1, document.getElementById('total-goals-summary-1'));
        displayUnderOver05Table(underOverStats2, teamName2, document.getElementById('total-goals-summary-2'));


        //under 1,5
        const underOver15Stats1 = getUnderOver15Summary(data.team1Matches);
        const underOver15Stats2 = getUnderOver15Summary(data.team2Matches);
        
        displayUnderOver15Table(underOver15Stats1, teamName1, document.getElementById('total-goals-summary-1'));
        displayUnderOver15Table(underOver15Stats2, teamName2, document.getElementById('total-goals-summary-2'));
        //under 2,5
        const underOver25Stats1 = getUnderOver25Summary(data.team1Matches);
        const underOver25Stats2 = getUnderOver25Summary(data.team2Matches);
        
        displayUnderOver25Table(underOver25Stats1, teamName1, document.getElementById('total-goals-summary-1'));
        displayUnderOver25Table(underOver25Stats2, teamName2, document.getElementById('total-goals-summary-2'));
        //under 3,5
        const underOver35Stats1 = getUnderOver35Summary(data.team1Matches);
        const underOver35Stats2 = getUnderOver35Summary(data.team2Matches);
        
        displayUnderOver35Table(underOver35Stats1, teamName1, document.getElementById('total-goals-summary-1'));
        displayUnderOver35Table(underOver35Stats2, teamName2, document.getElementById('total-goals-summary-2'));
        //gol no gol
        const goalNoGoalStats1 = getGoalNoGoalSummary(data.team1Matches);
        const goalNoGoalStats2 = getGoalNoGoalSummary(data.team2Matches);
        
        displayGoalNoGoalTable(goalNoGoalStats1, teamName1, document.getElementById('total-goals-summary-1'));
        displayGoalNoGoalTable(goalNoGoalStats2, teamName2, document.getElementById('total-goals-summary-2'));
        
        //1x + under1,5 ecc
        const comboStats1 = getDoubleChanceUnderOver15(data.team1Matches, teamName1);
        const comboStats2 = getDoubleChanceUnderOver15(data.team2Matches, teamName2);
        
        displayDoubleChanceUnderOver15Table(comboStats1, teamName1, document.getElementById('total-goals-summary-1'));
        displayDoubleChanceUnderOver15Table(comboStats2, teamName2, document.getElementById('total-goals-summary-2'));
        
      //1x + under2,5 ecc

      const combo25Stats1 = getDoubleChanceUnderOver25(data.team1Matches, teamName1);
      const combo25Stats2 = getDoubleChanceUnderOver25(data.team2Matches, teamName2);
      
      displayDoubleChanceUnderOver25Table(combo25Stats1, teamName1, document.getElementById('total-goals-summary-1'));
      displayDoubleChanceUnderOver25Table(combo25Stats2, teamName2, document.getElementById('total-goals-summary-2'));
      //1x + under3,5 ecc
      const combo35Stats1 = getDoubleChanceUnderOver35(data.team1Matches, teamName1);
      const combo35Stats2 = getDoubleChanceUnderOver35(data.team2Matches, teamName2);
      
      displayDoubleChanceUnderOver35Table(combo35Stats1, teamName1, document.getElementById('total-goals-summary-1'));
      displayDoubleChanceUnderOver35Table(combo35Stats2, teamName2, document.getElementById('total-goals-summary-2'));
      
      //1x + gol ecc
      const comboGoalStats1 = getDoubleChanceGoalNoGoal(data.team1Matches, teamName1);
      const comboGoalStats2 = getDoubleChanceGoalNoGoal(data.team2Matches, teamName2);
      
      displayDoubleChanceGoalNoGoalTable(comboGoalStats1, teamName1, document.getElementById('total-goals-summary-1'));
      displayDoubleChanceGoalNoGoalTable(comboGoalStats2, teamName2, document.getElementById('total-goals-summary-2'));
      
     //1 + under1,5 ecc
      const fixedComboStats1 = getFixedResultUnderOverStats(data.team1Matches);
      const fixedComboStats2 = getFixedResultUnderOverStats(data.team2Matches);
      
      displayFixedResultUnderOverTable(fixedComboStats1, teamName1, document.getElementById('total-goals-summary-1'));
      displayFixedResultUnderOverTable(fixedComboStats2, teamName2, document.getElementById('total-goals-summary-2'));
       
      //1 + gol ecc
      const fixedResultGoalStats1 = getFixedResultGoalNoGoalStats(data.team1Matches);
      const fixedResultGoalStats2 = getFixedResultGoalNoGoalStats(data.team2Matches);

     displayFixedResultGoalNoGoalTable(fixedResultGoalStats1, teamName1, document.getElementById('total-goals-summary-1'));
     displayFixedResultGoalNoGoalTable(fixedResultGoalStats2, teamName2, document.getElementById('total-goals-summary-2'));

    //tris + under1,5ecc
     const tripleStats1 = getTripleComboStats(data.team1Matches);
     const tripleStats2 = getTripleComboStats(data.team2Matches);
     
     displayTripleComboTable(tripleStats1, teamName1, document.getElementById('total-goals-summary-1'));
     displayTripleComboTable(tripleStats2, teamName2, document.getElementById('total-goals-summary-2'));
     
//tris + under2,5ecc

const tripleStats25_1 = getTripleComboStats25(data.team1Matches);
const tripleStats25_2 = getTripleComboStats25(data.team2Matches);

displayTripleComboTable25(tripleStats25_1, teamName1, document.getElementById('total-goals-summary-1'));
displayTripleComboTable25(tripleStats25_2, teamName2, document.getElementById('total-goals-summary-2'));

//tris + under3,5ecc
const tripleStats35_1 = getTripleComboStats35(data.team1Matches);
const tripleStats35_2 = getTripleComboStats35(data.team2Matches);

displayTripleComboTable35(tripleStats35_1, teamName1, document.getElementById('total-goals-summary-1'));
displayTripleComboTable35(tripleStats35_2, teamName2, document.getElementById('total-goals-summary-2'));

//tris secco + under1,5ecc
const fixedCombo15_1 = getFixedComboStats15(data.team1Matches);
const fixedCombo15_2 = getFixedComboStats15(data.team2Matches);

displayFixedComboTable15(fixedCombo15_1, teamName1, document.getElementById('total-goals-summary-1'));
displayFixedComboTable15(fixedCombo15_2, teamName2, document.getElementById('total-goals-summary-2'));

//tris secco + under2,5ecc
const fixedCombo25_1 = getFixedComboStats25(data.team1Matches);
const fixedCombo25_2 = getFixedComboStats25(data.team2Matches);

displayFixedComboTable25(fixedCombo25_1, teamName1, document.getElementById('total-goals-summary-1'));
displayFixedComboTable25(fixedCombo25_2, teamName2, document.getElementById('total-goals-summary-2'));
//tris secco + under3,5ecc
const fixedCombo35_1 = getFixedComboStats35(data.team1Matches);
const fixedCombo35_2 = getFixedComboStats35(data.team2Matches);

displayFixedComboTable35(fixedCombo35_1, teamName1, document.getElementById('total-goals-summary-1'));
displayFixedComboTable35(fixedCombo35_2, teamName2, document.getElementById('total-goals-summary-2'));
//pari dispari
const evenOddStats1 = getEvenOddStats(data.team1Matches);
const evenOddStats2 = getEvenOddStats(data.team2Matches);

displayEvenOddTable(evenOddStats1, teamName1, document.getElementById('total-goals-summary-1'));
displayEvenOddTable(evenOddStats2, teamName2, document.getElementById('total-goals-summary-2'));


//tabella distanza risultati esatti

const resultSet = [
    "1-0", "0-0", "0-1", "0-4", "4-0", "2-5",
    "2-0", "1-1", "0-2", "1-4", "4-1", "3-5",
    "2-1", "2-2", "1-2", "2-4", "4-2", "4-5",
    "3-0", "3-3", "0-3", "3-4", "4-3", "5-2",
    "3-1", "4-4", "1-3", "0-5", "5-0", "5-3",
    "3-2", "5-5", "2-3", "1-5", "5-1", "5-4"
];

const gaps1 = getExactScoreGaps(data.team1Matches, resultSet);
const gaps2 = getExactScoreGaps(data.team2Matches, resultSet);

displayExactScoreGapsTable(gaps1, teamName1, document.getElementById('total-goals-summary-1'));
displayExactScoreGapsTable(gaps2, teamName2, document.getElementById('total-goals-summary-2'));























    
        // Serie risultati
        renderMatchSummary(teamName1, data.team1Matches, 'team-summary-1');
        renderMatchSummary(teamName2, data.team2Matches, 'team-summary-2');
    
        // Storico partite
        document.getElementById('results-1').innerHTML = renderMatches(teamName1, data.team1Matches);
        document.getElementById('results-2').innerHTML = renderMatches(teamName2, data.team2Matches);
    })
    .finally(() => {
        document.getElementById('loading-indicator').style.display = 'none';
    });
    
   
    
    
    
    });
    
});



function getCompName(id) {
    return {
        2019: 'Serie A',
        2021: 'Premier League',
        2014: 'La Liga',
        2015: 'Ligue 1',
        2002: 'Bundesliga'
    }[id] || id;
}

function analyzeGoalCounts(matches, teamName) {
    const goalCounts = { 0: 0, 1: 0, 2: 0, 3: 0, '3+': 0 };
    matches.forEach(match => {
        const isHome = match.homeTeam.name.toLowerCase().includes(teamName.toLowerCase());
        const isAway = match.awayTeam.name.toLowerCase().includes(teamName.toLowerCase());
        const teamGoals = isHome ? match.score.fullTime.home : isAway ? match.score.fullTime.away : null;
        if (typeof teamGoals === 'number') {
            if (teamGoals >= 4) goalCounts['3+']++;
            else if (goalCounts.hasOwnProperty(teamGoals)) goalCounts[teamGoals]++;
        }
    });
    return goalCounts;
}

function analyzeGoalsConceded(matches, teamName) {
    const concededCounts = { 0: 0, 1: 0, 2: 0, 3: 0, '3+': 0 };
    matches.forEach(match => {
        const isHome = match.homeTeam.name.toLowerCase().includes(teamName.toLowerCase());
        const isAway = match.awayTeam.name.toLowerCase().includes(teamName.toLowerCase());
        const oppGoals = isHome ? match.score.fullTime.away : isAway ? match.score.fullTime.home : null;
        if (typeof oppGoals === 'number') {
            if (oppGoals >= 4) concededCounts['3+']++;
            else if (concededCounts.hasOwnProperty(oppGoals)) concededCounts[oppGoals]++;
        }
    });
    return concededCounts;
}

function analyzeTotalGoals(matches) {
    const totalGoalsCount = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, '4+': 0 };
    matches.forEach(match => {
        const homeGoals = match.score.fullTime.home ?? 0;
        const awayGoals = match.score.fullTime.away ?? 0;
        const total = homeGoals + awayGoals;
        if (total >= 5) totalGoalsCount['4+']++;
        else if (totalGoalsCount.hasOwnProperty(total)) totalGoalsCount[total]++;
    });
    return totalGoalsCount;
}

function renderMatchSummary(teamName, matches, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';

    // Ordina le partite dalla più recente alla più vecchia
    const sortedMatches = [...matches].sort((a, b) => new Date(b.utcDate) - new Date(a.utcDate));

    // Prende le ultime 50 partite e le inverte per mostrare la più recente a sinistra
    sortedMatches.slice(0, 50).forEach(match => {

        const isHome = match.homeTeam.name.toLowerCase().includes(teamName.toLowerCase());
        const isAway = match.awayTeam.name.toLowerCase().includes(teamName.toLowerCase());
        const homeGoals = match.score.fullTime.home;
        const awayGoals = match.score.fullTime.away;
        const teamGoals = isHome ? homeGoals : awayGoals;
        const oppGoals = isHome ? awayGoals : homeGoals;

        let result = '', className = '';
        if (teamGoals > oppGoals) { result = 'V'; className = 'win'; }
        else if (teamGoals < oppGoals) { result = 'P'; className = 'loss'; }
        else { result = 'X'; className = 'draw'; }

        const div = document.createElement('div');
        div.textContent = result;
        div.className = `result ${className}`;
        container.appendChild(div);
    });
}


function renderMatches(team, matches) {
    matches = [...matches].sort((a, b) => new Date(b.utcDate) - new Date(a.utcDate));
    let html = `
        <div style="text-align: center; margin-bottom: 10px;">
            <div style="font-size: 1.3em; font-weight: bold;">Ultime 50 Partite</div>
            <div style="font-size: 1.5em; font-weight: bold; color: #333;">${team}</div>
        </div>
    `;
    matches.slice(0, 50).forEach(match => {
        const date = new Date(match.utcDate).toLocaleDateString('it-IT');
        const homeTeam = match.homeTeam.name;
        const awayTeam = match.awayTeam.name;
        const homeGoals = match.score.fullTime.home;
        const awayGoals = match.score.fullTime.away;
        const isHome = homeTeam.toLowerCase().includes(team.toLowerCase());
        const teamGoals = isHome ? homeGoals : awayGoals;
        const oppGoals = isHome ? awayGoals : homeGoals;
        let resultClass = '';
        if (teamGoals > oppGoals) resultClass = 'win-card';
        else if (teamGoals < oppGoals) resultClass = 'loss-card';
        else resultClass = 'draw-card';
        html += `
            <div class="match-card ${resultClass}">
                <div class="match-date" style="text-align: center;">${date}</div>
                <div class="match-layout">
                    <div class="team home">${homeTeam}</div>
                    <div class="score">${homeGoals} - ${awayGoals}</div>
                    <div class="team away">${awayTeam}</div>
                </div>
            </div>
        `;
    });
    return html;
}

function getExactScoreFrequencies(matches) {
    const scoreMap = new Map();
    matches.forEach(match => {
        const homeGoals = match.score.fullTime.home ?? 0;
        const awayGoals = match.score.fullTime.away ?? 0;
        const key = `${homeGoals}-${awayGoals}`;
        scoreMap.set(key, (scoreMap.get(key) || 0) + 1);
    });
    return scoreMap;
}

function displayGoalSummary(goalCounts, teamName, targetElement) {
    const total = Object.values(goalCounts).reduce((a, b) => a + b, 0);
    if (total === 0) return;
    let tableHtml = `
      <div style="text-align: center; margin-bottom: 10px;">
        <div style="font-size: 1.4em; font-weight: bold; color: #444;">Distribuzione Gol Segnati</div>
      </div>
    <table><tr><th>Gol</th><th>Qtà</th><th>% Uscita</th></tr>`;
    for (const key in goalCounts) {
        const count = goalCounts[key];
        const percent = ((count / total) * 100).toFixed(1) + '%';
        tableHtml += `<tr><td>${key}</td><td>${count}</td><td>${percent}</td></tr>`;
    }
    tableHtml += `<tr><td><strong>TOT.</strong></td><td><strong>${total}</strong></td><td><strong>100%</strong></td></tr></table>`;
    targetElement.insertAdjacentHTML('beforeend', tableHtml);
}

function displayGoalConcededSummary(concededCounts, teamName, targetElement) {
    const total = Object.values(concededCounts).reduce((a, b) => a + b, 0);
    if (total === 0) return;
    let tableHtml = `
      <div style="text-align: center; margin-bottom: 10px;">
        <div style="font-size: 1.4em; font-weight: bold; color: #d9534f;">Distribuzione Gol Subiti</div>
      </div>
    <table><tr><th>Gol</th><th>Qtà</th><th>% Uscita</th></tr>`;
    for (const key in concededCounts) {
        const count = concededCounts[key];
        const percent = ((count / total) * 100).toFixed(1) + '%';
        tableHtml += `<tr><td>${key}</td><td>${count}</td><td>${percent}</td></tr>`;
    }
    tableHtml += `<tr><td><strong>TOT.</strong></td><td><strong>${total}</strong></td><td><strong>100%</strong></td></tr></table>`;
    targetElement.insertAdjacentHTML('beforeend', tableHtml);
}

function displayTotalGoalsSummary(counts, teamName, targetElement) {
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    if (total === 0) return;
    let html = `
      <div style="text-align: center; margin-bottom: 10px;">
        <div style="font-size: 1.4em; font-weight: bold; color: #007bff;">Distribuzione Gol Totali</div>
      </div>
      <table><tr><th>Gol Totali</th><th>Qtà</th><th>% Uscita</th></tr>`;
    for (const key in counts) {
        const count = counts[key];
        const percent = ((count / total) * 100).toFixed(1) + '%';
        html += `<tr><td>${key}</td><td>${count}</td><td>${percent}</td></tr>`;
    }
    html += `<tr><td><strong>TOT.</strong></td><td><strong>${total}</strong></td><td><strong>100%</strong></td></tr></table>`;
    targetElement.insertAdjacentHTML('beforeend', html);
}

function displayExactScoresGrid(scoreMap, targetElement) {
    const desiredScores = [
        "1-0", "0-0", "0-1", "0-4", "4-0", "2-5",
        "2-0", "1-1", "0-2", "1-4", "4-1", "3-5",
        "2-1", "2-2", "1-2", "2-4", "4-2", "4-5",
        "3-0", "3-3", "0-3", "3-4", "4-3", "5-2",
        "3-1", "4-4", "1-3", "0-5", "5-0", "5-3",
        "3-2", "5-5", "2-3", "1-5", "5-1", "5-4"
    ];
    const perRow = 6;
    let html = `
        <div style="text-align: center; margin-top: 30px;">
            <div style="font-size: 1.4em; font-weight: bold; color: #8a2be2;">Distribuzione Risultati Esatti</div>
        </div>
        <table style="margin: 10px auto; border-collapse: collapse; font-size: 0.95em;">
    `;

    for (let i = 0; i < desiredScores.length; i += perRow) {
        const row = desiredScores.slice(i, i + perRow);

        html += '<tr>' + row.map((score, colIndex) => {
            const isEven = ((i / perRow) + colIndex) % 2 === 0;
            const bg = isEven ? '#e6f7ff' : '#ffffff';
            return `<td style="padding: 6px 12px; text-align: center; font-weight: bold; border: 2px solid #444; border-bottom: none; background-color: ${bg};">${score}</td>`;
        }).join('') + '</tr>';

        html += '<tr>' + row.map((score, colIndex) => {
            const isEven = ((i / perRow) + colIndex) % 2 === 0;
            const bg = isEven ? '#e6f7ff' : '#ffffff';
            const value = scoreMap.get(score) || 0;
            return `<td style="padding: 6px 12px; text-align: center; border: 2px solid #444; border-top: none; background-color: ${bg};">${value}</td>`;
        }).join('') + '</tr>';
    }

    html += '</table>';
    targetElement.insertAdjacentHTML('beforeend', html);
}






function displayUnderOver05Table(stats, teamName, targetElement) {
    let html = `
    <div style="text-align: center; margin-top: 20px;">
        <div style="font-size: 1.3em; font-weight: bold; color: #28a745;">Under/Over 0.5 Totali</div>
    </div>
    <table style="margin: 10px auto; border-collapse: collapse; font-size: 0.95em;">
        <tr><th>Tipo</th><th>Qtà</th><th>% Uscita</th></tr>
        <tr><td>UNDER 0.5</td><td>${stats.under05}</td><td>${stats.underPercent}</td></tr>
        <tr><td>OVER 0.5</td><td>${stats.over05}</td><td>${stats.overPercent}</td></tr>
        <tr><td><strong>TOT.</strong></td><td><strong>${stats.total}</strong></td><td><strong>100%</strong></td></tr>
    </table>
    `;
    targetElement.insertAdjacentHTML('beforeend', html);
}

function displayUnderOver15Table(stats, teamName, targetElement) {
    let html = `
    <div style="text-align: center; margin-top: 20px;">
        <div style="font-size: 1.3em; font-weight: bold; color: #ff6600;">Under/Over 1.5 Totali</div>
    </div>
    <table style="margin: 10px auto; border-collapse: collapse; font-size: 0.95em;">
        <tr><th>Tipo</th><th>Qtà</th><th>% Uscita</th></tr>
        <tr><td>UNDER 1.5</td><td>${stats.under15}</td><td>${stats.underPercent}</td></tr>
        <tr><td>OVER 1.5</td><td>${stats.over15}</td><td>${stats.overPercent}</td></tr>
        <tr><td><strong>TOT.</strong></td><td><strong>${stats.total}</strong></td><td><strong>100%</strong></td></tr>
    </table>
    `;
    targetElement.insertAdjacentHTML('beforeend', html);
}

function displayUnderOver25Table(stats, teamName, targetElement) {
    let html = `
    <div style="text-align: center; margin-top: 20px;">
        <div style="font-size: 1.3em; font-weight: bold; color: #dc3545;">Under/Over 2.5 Totali</div>
    </div>
    <table style="margin: 10px auto; border-collapse: collapse; font-size: 0.95em;">
        <tr><th>Tipo</th><th>Qtà</th><th>% Uscita</th></tr>
        <tr><td>UNDER 2.5</td><td>${stats.under25}</td><td>${stats.underPercent}</td></tr>
        <tr><td>OVER 2.5</td><td>${stats.over25}</td><td>${stats.overPercent}</td></tr>
        <tr><td><strong>TOT.</strong></td><td><strong>${stats.total}</strong></td><td><strong>100%</strong></td></tr>
    </table>
    `;
    targetElement.insertAdjacentHTML('beforeend', html);
}

function displayUnderOver35Table(stats, teamName, targetElement) {
    let html = `
    <div style="text-align: center; margin-top: 20px;">
        <div style="font-size: 1.3em; font-weight: bold; color: #6610f2;">Under/Over 3.5 Totali</div>
    </div>
    <table style="margin: 10px auto; border-collapse: collapse; font-size: 0.95em;">
        <tr><th>Tipo</th><th>Qtà</th><th>% Uscita</th></tr>
        <tr><td>UNDER 3.5</td><td>${stats.under35}</td><td>${stats.underPercent}</td></tr>
        <tr><td>OVER 3.5</td><td>${stats.over35}</td><td>${stats.overPercent}</td></tr>
        <tr><td><strong>TOT.</strong></td><td><strong>${stats.total}</strong></td><td><strong>100%</strong></td></tr>
    </table>
    `;
    targetElement.insertAdjacentHTML('beforeend', html);
}


function displayGoalNoGoalTable(stats, teamName, targetElement) {
    let html = `
    <div style="text-align: center; margin-top: 20px;">
        <div style="font-size: 1.3em; font-weight: bold; color: #ff5733;">Gol / No Gol</div>
    </div>
    <table style="margin: 10px auto; border-collapse: collapse; font-size: 0.95em;">
        <tr><th>Tipo</th><th>Qtà</th><th>% Uscita</th></tr>
        <tr><td>GOL</td><td>${stats.goal}</td><td>${stats.goalPercent}</td></tr>
        <tr><td>NO GOL</td><td>${stats.noGoal}</td><td>${stats.noGoalPercent}</td></tr>
        <tr><td><strong>TOT.</strong></td><td><strong>${stats.total}</strong></td><td><strong>100%</strong></td></tr>
    </table>
    `;
    targetElement.insertAdjacentHTML('beforeend', html);
}

function displayDoubleChanceUnderOver15Table(stats, teamName, targetElement) {
    let html = `
    <div style="text-align: center; margin-top: 25px;">
        <div style="font-size: 1.3em; font-weight: bold; color: #17a2b8;">Doppia Chance + Under/Over 1.5</div>
    </div>
    <table style="margin: 10px auto; border-collapse: collapse; font-size: 0.95em;">
        <tr><th>Combinazione</th><th>Qtà</th><th>% Uscita</th></tr>
        <tr><td>1X + UNDER 1.5</td><td>${stats['1X+U1.5'].count}</td><td>${stats['1X+U1.5'].percent}</td></tr>
        <tr><td>1X + OVER 1.5</td><td>${stats['1X+O1.5'].count}</td><td>${stats['1X+O1.5'].percent}</td></tr>
        <tr><td>X2 + UNDER 1.5</td><td>${stats['X2+U1.5'].count}</td><td>${stats['X2+U1.5'].percent}</td></tr>
        <tr><td>X2 + OVER 1.5</td><td>${stats['X2+O1.5'].count}</td><td>${stats['X2+O1.5'].percent}</td></tr>
        <tr><td>12 + UNDER 1.5</td><td>${stats['12+U1.5'].count}</td><td>${stats['12+U1.5'].percent}</td></tr>
        <tr><td>12 + OVER 1.5</td><td>${stats['12+O1.5'].count}</td><td>${stats['12+O1.5'].percent}</td></tr>
        <tr><td><strong>TOT.</strong></td><td><strong>${stats.total}</strong></td><td><strong>100%</strong></td></tr>
    </table>
    `;
    targetElement.insertAdjacentHTML('beforeend', html);
}

function displayDoubleChanceUnderOver25Table(stats, teamName, targetElement) {
    let html = `
    <div style="text-align: center; margin-top: 25px;">
        <div style="font-size: 1.3em; font-weight: bold; color: #007bff;">Doppia Chance + Under/Over 2.5</div>
    </div>
    <table style="margin: 10px auto; border-collapse: collapse; font-size: 0.95em;">
        <tr><th>Combinazione</th><th>Qtà</th><th>% Uscita</th></tr>
        <tr><td>1X + UNDER 2.5</td><td>${stats['1X+U2.5'].count}</td><td>${stats['1X+U2.5'].percent}</td></tr>
        <tr><td>1X + OVER 2.5</td><td>${stats['1X+O2.5'].count}</td><td>${stats['1X+O2.5'].percent}</td></tr>
        <tr><td>X2 + UNDER 2.5</td><td>${stats['X2+U2.5'].count}</td><td>${stats['X2+U2.5'].percent}</td></tr>
        <tr><td>X2 + OVER 2.5</td><td>${stats['X2+O2.5'].count}</td><td>${stats['X2+O2.5'].percent}</td></tr>
        <tr><td>12 + UNDER 2.5</td><td>${stats['12+U2.5'].count}</td><td>${stats['12+U2.5'].percent}</td></tr>
        <tr><td>12 + OVER 2.5</td><td>${stats['12+O2.5'].count}</td><td>${stats['12+O2.5'].percent}</td></tr>
        <tr><td><strong>TOT.</strong></td><td><strong>${stats.total}</strong></td><td><strong>100%</strong></td></tr>
    </table>
    `;
    targetElement.insertAdjacentHTML('beforeend', html);
}

function displayDoubleChanceUnderOver35Table(stats, teamName, targetElement) {
    let html = `
    <div style="text-align: center; margin-top: 25px;">
        <div style="font-size: 1.3em; font-weight: bold; color: #6f42c1;">Doppia Chance + Under/Over 3.5</div>
    </div>
    <table style="margin: 10px auto; border-collapse: collapse; font-size: 0.95em;">
        <tr><th>Combinazione</th><th>Qtà</th><th>% Uscita</th></tr>
        <tr><td>1X + UNDER 3.5</td><td>${stats['1X+U3.5'].count}</td><td>${stats['1X+U3.5'].percent}</td></tr>
        <tr><td>1X + OVER 3.5</td><td>${stats['1X+O3.5'].count}</td><td>${stats['1X+O3.5'].percent}</td></tr>
        <tr><td>X2 + UNDER 3.5</td><td>${stats['X2+U3.5'].count}</td><td>${stats['X2+U3.5'].percent}</td></tr>
        <tr><td>X2 + OVER 3.5</td><td>${stats['X2+O3.5'].count}</td><td>${stats['X2+O3.5'].percent}</td></tr>
        <tr><td>12 + UNDER 3.5</td><td>${stats['12+U3.5'].count}</td><td>${stats['12+U3.5'].percent}</td></tr>
        <tr><td>12 + OVER 3.5</td><td>${stats['12+O3.5'].count}</td><td>${stats['12+O3.5'].percent}</td></tr>
        <tr><td><strong>TOT.</strong></td><td><strong>${stats.total}</strong></td><td><strong>100%</strong></td></tr>
    </table>
    `;
    targetElement.insertAdjacentHTML('beforeend', html);
}


function displayDoubleChanceGoalNoGoalTable(stats, teamName, targetElement) {
    let html = `
    <div style="text-align: center; margin-top: 25px;">
        <div style="font-size: 1.3em; font-weight: bold; color: #dc3545;">Doppia Chance + Gol / No Gol</div>
    </div>
    <table style="margin: 10px auto; border-collapse: collapse; font-size: 0.95em;">
        <tr><th>Combinazione</th><th>Qtà</th><th>% Uscita</th></tr>
        <tr><td>1X + GOL</td><td>${stats['1X+GOL'].count}</td><td>${stats['1X+GOL'].percent}</td></tr>
        <tr><td>1X + NO GOL</td><td>${stats['1X+NG'].count}</td><td>${stats['1X+NG'].percent}</td></tr>
        <tr><td>X2 + GOL</td><td>${stats['X2+GOL'].count}</td><td>${stats['X2+GOL'].percent}</td></tr>
        <tr><td>X2 + NO GOL</td><td>${stats['X2+NG'].count}</td><td>${stats['X2+NG'].percent}</td></tr>
        <tr><td>12 + GOL</td><td>${stats['12+GOL'].count}</td><td>${stats['12+GOL'].percent}</td></tr>
        <tr><td>12 + NO GOL</td><td>${stats['12+NG'].count}</td><td>${stats['12+NG'].percent}</td></tr>
        <tr><td><strong>TOT.</strong></td><td><strong>${stats.total}</strong></td><td><strong>100%</strong></td></tr>
    </table>
    `;
    targetElement.insertAdjacentHTML('beforeend', html);
}


function displayFixedResultUnderOverTable(stats, teamName, targetElement) {
    let html = `
    <div style="text-align: center; margin-top: 30px;">
        <div style="font-size: 1.3em; font-weight: bold; color: #20c997;">Fisso + Under/Over (1.5 - 3.5)</div>
    </div>
    <table style="margin: 10px auto; border-collapse: collapse; font-size: 0.95em;">
        <tr><th>Combinazione</th><th>Qtà</th><th>% Uscita</th></tr>
    `;

    ['1', 'X', '2'].forEach(outcome => {
        [1.5, 2.5, 3.5].forEach(thresh => {
            html += `
            <tr><td>${outcome} + UNDER ${thresh}</td><td>${stats[`${outcome}+U${thresh}`].count}</td><td>${stats[`${outcome}+U${thresh}`].percent}</td></tr>
            <tr><td>${outcome} + OVER ${thresh}</td><td>${stats[`${outcome}+O${thresh}`].count}</td><td>${stats[`${outcome}+O${thresh}`].percent}</td></tr>
            `;
        });
    });

    html += `<tr><td><strong>TOT.</strong></td><td><strong>${stats.total}</strong></td><td><strong>100%</strong></td></tr></table>`;
    targetElement.insertAdjacentHTML('beforeend', html);
}

function displayFixedResultGoalNoGoalTable(stats, teamName, targetElement) {
    let html = `
    <div style="text-align: center; margin-top: 30px;">
        <div style="font-size: 1.3em; font-weight: bold; color: #fd7e14;">Fisso + Gol / No Gol</div>
    </div>
    <table style="margin: 10px auto; border-collapse: collapse; font-size: 0.95em;">
        <tr><th>Combinazione</th><th>Qtà</th><th>% Uscita</th></tr>
        <tr><td>1 + GOL</td><td>${stats['1+GOL'].count}</td><td>${stats['1+GOL'].percent}</td></tr>
        <tr><td>1 + NO GOL</td><td>${stats['1+NG'].count}</td><td>${stats['1+NG'].percent}</td></tr>
        <tr><td>X + GOL</td><td>${stats['X+GOL'].count}</td><td>${stats['X+GOL'].percent}</td></tr>
        <tr><td>X + NO GOL</td><td>${stats['X+NG'].count}</td><td>${stats['X+NG'].percent}</td></tr>
        <tr><td>2 + GOL</td><td>${stats['2+GOL'].count}</td><td>${stats['2+GOL'].percent}</td></tr>
        <tr><td>2 + NO GOL</td><td>${stats['2+NG'].count}</td><td>${stats['2+NG'].percent}</td></tr>
        <tr><td><strong>TOT.</strong></td><td><strong>${stats.total}</strong></td><td><strong>100%</strong></td></tr>
    </table>
    `;
    targetElement.insertAdjacentHTML('beforeend', html);
}


function displayTripleComboTable(stats, teamName, targetElement) {
    let html = `
    <div style="text-align: center; margin-top: 30px;">
        <div style="font-size: 1.3em; font-weight: bold; color: #7952b3;">Doppia Chance + U/O 1.5 + Gol/NoGol</div>
    </div>
    <table style="margin: 10px auto; border-collapse: collapse; font-size: 0.95em;">
        <tr><th>Combinazione</th><th>Qtà</th><th>% Uscita</th></tr>
    `;

    ['1X', 'X2', '12'].forEach(dc => {
        ['U1.5', 'O1.5'].forEach(ou => {
            ['GOL', 'NG'].forEach(gn => {
                const key = `${dc}+${ou}+${gn}`;
                html += `<tr><td>${dc} + ${ou.replace('U','UNDER ').replace('O','OVER ')} + ${gn.replace('NG','NO GOL')}</td><td>${stats[key].count}</td><td>${stats[key].percent}</td></tr>`;
            });
        });
    });

    html += `<tr><td><strong>TOT.</strong></td><td><strong>${stats.total}</strong></td><td><strong>100%</strong></td></tr></table>`;
    targetElement.insertAdjacentHTML('beforeend', html);
}


function displayTripleComboTable25(stats, teamName, targetElement) {
    let html = `
    <div style="text-align: center; margin-top: 30px;">
        <div style="font-size: 1.3em; font-weight: bold; color: #0d6efd;">Doppia Chance + U/O 2.5 + Gol/NoGol</div>
    </div>
    <table style="margin: 10px auto; border-collapse: collapse; font-size: 0.95em;">
        <tr><th>Combinazione</th><th>Qtà</th><th>% Uscita</th></tr>
    `;

    ['1X', 'X2', '12'].forEach(dc => {
        ['U2.5', 'O2.5'].forEach(ou => {
            ['GOL', 'NG'].forEach(gn => {
                const key = `${dc}+${ou}+${gn}`;
                html += `<tr><td>${dc} + ${ou.replace('U','UNDER ').replace('O','OVER ')} + ${gn.replace('NG','NO GOL')}</td><td>${stats[key].count}</td><td>${stats[key].percent}</td></tr>`;
            });
        });
    });

    html += `<tr><td><strong>TOT.</strong></td><td><strong>${stats.total}</strong></td><td><strong>100%</strong></td></tr></table>`;
    targetElement.insertAdjacentHTML('beforeend', html);
}

function displayTripleComboTable35(stats, teamName, targetElement) {
    let html = `
    <div style="text-align: center; margin-top: 30px;">
        <div style="font-size: 1.3em; font-weight: bold; color: #198754;">Doppia Chance + U/O 3.5 + Gol/NoGol</div>
    </div>
    <table style="margin: 10px auto; border-collapse: collapse; font-size: 0.95em;">
        <tr><th>Combinazione</th><th>Qtà</th><th>% Uscita</th></tr>
    `;

    ['1X', 'X2', '12'].forEach(dc => {
        ['U3.5', 'O3.5'].forEach(ou => {
            ['GOL', 'NG'].forEach(gn => {
                const key = `${dc}+${ou}+${gn}`;
                html += `<tr><td>${dc} + ${ou.replace('U','UNDER ').replace('O','OVER ')} + ${gn.replace('NG','NO GOL')}</td><td>${stats[key].count}</td><td>${stats[key].percent}</td></tr>`;
            });
        });
    });

    html += `<tr><td><strong>TOT.</strong></td><td><strong>${stats.total}</strong></td><td><strong>100%</strong></td></tr></table>`;
    targetElement.insertAdjacentHTML('beforeend', html);
}


function displayFixedComboTable15(stats, teamName, targetElement) {
    let html = `
    <div style="text-align: center; margin-top: 30px;">
        <div style="font-size: 1.3em; font-weight: bold; color: #e83e8c;">Fisso + U/O 1.5 + Gol/NoGol</div>
    </div>
    <table style="margin: 10px auto; border-collapse: collapse; font-size: 0.95em;">
        <tr><th>Combinazione</th><th>Qtà</th><th>% Uscita</th></tr>
    `;

    ['1', 'X', '2'].forEach(res => {
        ['U1.5', 'O1.5'].forEach(ou => {
            ['GOL', 'NG'].forEach(gn => {
                const key = `${res}+${ou}+${gn}`;
                html += `<tr><td>${res} + ${ou.replace('U','UNDER ').replace('O','OVER ')} + ${gn.replace('NG','NO GOL')}</td><td>${stats[key].count}</td><td>${stats[key].percent}</td></tr>`;
            });
        });
    });

    html += `<tr><td><strong>TOT.</strong></td><td><strong>${stats.total}</strong></td><td><strong>100%</strong></td></tr></table>`;
    targetElement.insertAdjacentHTML('beforeend', html);
}


function displayFixedComboTable25(stats, teamName, targetElement) {
    let html = `
    <div style="text-align: center; margin-top: 30px;">
        <div style="font-size: 1.3em; font-weight: bold; color: #0dcaf0;">Fisso + U/O 2.5 + Gol/NoGol</div>
    </div>
    <table style="margin: 10px auto; border-collapse: collapse; font-size: 0.95em;">
        <tr><th>Combinazione</th><th>Qtà</th><th>% Uscita</th></tr>
    `;

    ['1', 'X', '2'].forEach(res => {
        ['U2.5', 'O2.5'].forEach(ou => {
            ['GOL', 'NG'].forEach(gn => {
                const key = `${res}+${ou}+${gn}`;
                html += `<tr><td>${res} + ${ou.replace('U','UNDER ').replace('O','OVER ')} + ${gn.replace('NG','NO GOL')}</td><td>${stats[key].count}</td><td>${stats[key].percent}</td></tr>`;
            });
        });
    });

    html += `<tr><td><strong>TOT.</strong></td><td><strong>${stats.total}</strong></td><td><strong>100%</strong></td></tr></table>`;
    targetElement.insertAdjacentHTML('beforeend', html);
}

function displayFixedComboTable35(stats, teamName, targetElement) {
    let html = `
    <div style="text-align: center; margin-top: 30px;">
        <div style="font-size: 1.3em; font-weight: bold; color: #198754;">Fisso + U/O 3.5 + Gol/NoGol</div>
    </div>
    <table style="margin: 10px auto; border-collapse: collapse; font-size: 0.95em;">
        <tr><th>Combinazione</th><th>Qtà</th><th>% Uscita</th></tr>
    `;

    ['1', 'X', '2'].forEach(res => {
        ['U3.5', 'O3.5'].forEach(ou => {
            ['GOL', 'NG'].forEach(gn => {
                const key = `${res}+${ou}+${gn}`;
                html += `<tr><td>${res} + ${ou.replace('U','UNDER ').replace('O','OVER ')} + ${gn.replace('NG','NO GOL')}</td><td>${stats[key].count}</td><td>${stats[key].percent}</td></tr>`;
            });
        });
    });

    html += `<tr><td><strong>TOT.</strong></td><td><strong>${stats.total}</strong></td><td><strong>100%</strong></td></tr></table>`;
    targetElement.insertAdjacentHTML('beforeend', html);
}

function displayEvenOddTable(stats, teamName, targetElement) {
    let html = `
    <div style="text-align: center; margin-top: 30px;">
        <div style="font-size: 1.3em; font-weight: bold; color: #6610f2;">Pari / Dispari</div>
    </div>
    <table style="margin: 10px auto; border-collapse: collapse; font-size: 0.95em;">
        <tr><th>Categoria</th><th>Tipo</th><th>Qtà</th><th>%</th></tr>
        <tr><td>Totale</td><td>Pari</td><td>${stats.totalEven.count}</td><td>${stats.totalEven.percent}</td></tr>
        <tr><td>Totale</td><td>Dispari</td><td>${stats.totalOdd.count}</td><td>${stats.totalOdd.percent}</td></tr>
        <tr><td>Casa</td><td>Pari</td><td>${stats.homeEven.count}</td><td>${stats.homeEven.percent}</td></tr>
        <tr><td>Casa</td><td>Dispari</td><td>${stats.homeOdd.count}</td><td>${stats.homeOdd.percent}</td></tr>
        <tr><td>Ospite</td><td>Pari</td><td>${stats.awayEven.count}</td><td>${stats.awayEven.percent}</td></tr>
        <tr><td>Ospite</td><td>Dispari</td><td>${stats.awayOdd.count}</td><td>${stats.awayOdd.percent}</td></tr>
        <tr><td><strong>TOT.</strong></td><td><strong>P/D</strong></td><td><strong>${stats.total}</strong></td><td><strong>100%</strong></td></tr>

    </table>
    `;
    targetElement.insertAdjacentHTML('beforeend', html);
}



function displayExactScoreGapsTable(gaps, teamName, targetElement) {
    let html = `
    <div style="text-align: center; margin-top: 30px;">
        <div style="font-size: 1.3em; font-weight: bold; color: #dc3545;">Ritardo di risultato</div>
    </div>
    <table style="margin: 10px auto; border-collapse: collapse; font-size: 0.95em;">
        <tr><th>Risultato</th><th>Partite dall'ultima occorrenza</th></tr>
    `;

    for (const key in gaps) {
        html += `<tr><td>${key}</td><td>${gaps[key]}</td></tr>`;
    }

    html += `</table>`;
    targetElement.insertAdjacentHTML('beforeend', html);
}
























































// 🔹 RIEPILOGO V/X/P
function calculateMatchResults(matches, teamName) {
    let win = 0, draw = 0, loss = 0;
    matches.forEach(match => {
        const isHome = match.homeTeam.name.toLowerCase().includes(teamName.toLowerCase());
        const isAway = match.awayTeam.name.toLowerCase().includes(teamName.toLowerCase());
        const teamGoals = isHome ? match.score.fullTime.home : isAway ? match.score.fullTime.away : null;
        const oppGoals = isHome ? match.score.fullTime.away : isAway ? match.score.fullTime.home : null;
        if (teamGoals > oppGoals) win++;
        else if (teamGoals < oppGoals) loss++;
        else draw++;
    });
    return { win, draw, loss };
}

function displayMatchResultSummary(results, teamName, targetElement) {
    const total = results.win + results.draw + results.loss;
    if (total === 0) return;

    const toPercent = (val) => ((val / total) * 100).toFixed(1) + "%";

    let html = `
    <div style="text-align: center; margin-bottom: 10px;">
        <div style="font-size: 1.4em; font-weight: bold; color: #333;">Riepilogo Risultati</div>
    </div>
    <table style="margin: 0 auto; border-collapse: collapse; font-size: 0.95em; width: 80%; margin-bottom: 30px;">
        <tr><th>Risultato</th><th>Qtà</th><th>% Uscita</th></tr>
        <tr><td>Vittorie</td><td>${results.win}</td><td>${toPercent(results.win)}</td></tr>
        <tr><td>Pareggi</td><td>${results.draw}</td><td>${toPercent(results.draw)}</td></tr>
        <tr><td>Sconfitte</td><td>${results.loss}</td><td>${toPercent(results.loss)}</td></tr>
        <tr><td><strong>TOT.</strong></td><td><strong>${total}</strong></td><td><strong>100%</strong></td></tr>
    </table>
`;


    targetElement.insertAdjacentHTML('afterbegin', html);
}



function getUnderOver05Summary(matches) {
    let under05 = 0;
    let over05 = 0;

    matches.forEach(match => {
        const home = match.score.fullTime.home ?? 0;
        const away = match.score.fullTime.away ?? 0;
        const total = home + away;
        if (total === 0) under05++;
        else over05++;
    });

    const total = under05 + over05;

    return {
        under05,
        over05,
        total,
        underPercent: total ? ((under05 / total) * 100).toFixed(1) + '%' : '0.0%',
        overPercent: total ? ((over05 / total) * 100).toFixed(1) + '%' : '0.0%'
    };
}

function getUnderOver15Summary(matches) {
    let under15 = 0;
    let over15 = 0;

    matches.forEach(match => {
        const home = match.score.fullTime.home ?? 0;
        const away = match.score.fullTime.away ?? 0;
        const total = home + away;
        if (total < 2) under15++;
        else over15++;
    });

    const total = under15 + over15;

    return {
        under15,
        over15,
        total,
        underPercent: total ? ((under15 / total) * 100).toFixed(1) + '%' : '0.0%',
        overPercent: total ? ((over15 / total) * 100).toFixed(1) + '%' : '0.0%'
    };
}

function getUnderOver25Summary(matches) {
    let under25 = 0;
    let over25 = 0;

    matches.forEach(match => {
        const home = match.score.fullTime.home ?? 0;
        const away = match.score.fullTime.away ?? 0;
        const total = home + away;
        if (total < 3) under25++;
        else over25++;
    });

    const total = under25 + over25;

    return {
        under25,
        over25,
        total,
        underPercent: total ? ((under25 / total) * 100).toFixed(1) + '%' : '0.0%',
        overPercent: total ? ((over25 / total) * 100).toFixed(1) + '%' : '0.0%'
    };
}

function getUnderOver35Summary(matches) {
    let under35 = 0;
    let over35 = 0;

    matches.forEach(match => {
        const home = match.score.fullTime.home ?? 0;
        const away = match.score.fullTime.away ?? 0;
        const total = home + away;
        if (total < 4) under35++;
        else over35++;
    });

    const total = under35 + over35;

    return {
        under35,
        over35,
        total,
        underPercent: total ? ((under35 / total) * 100).toFixed(1) + '%' : '0.0%',
        overPercent: total ? ((over35 / total) * 100).toFixed(1) + '%' : '0.0%'
    };
}


function getGoalNoGoalSummary(matches) {
    let goal = 0;
    let noGoal = 0;

    matches.forEach(match => {
        const home = match.score.fullTime.home ?? 0;
        const away = match.score.fullTime.away ?? 0;
        if (home > 0 && away > 0) {
            goal++;
        } else {
            noGoal++;
        }
    });

    const total = goal + noGoal;

    return {
        goal,
        noGoal,
        total,
        goalPercent: total ? ((goal / total) * 100).toFixed(1) + '%' : '0.0%',
        noGoalPercent: total ? ((noGoal / total) * 100).toFixed(1) + '%' : '0.0%'
    };
}


function getDoubleChanceUnderOver15(matches, teamName) {
    const counters = {
        '1X+U1.5': 0,
        '1X+O1.5': 0,
        'X2+U1.5': 0,
        'X2+O1.5': 0,
        '12+U1.5': 0,
        '12+O1.5': 0
    };

    let total = 0;

    matches.forEach(match => {
        const isHome = match.homeTeam.name.toLowerCase().includes(teamName.toLowerCase());
        const isAway = match.awayTeam.name.toLowerCase().includes(teamName.toLowerCase());
        const home = match.score.fullTime.home ?? 0;
        const away = match.score.fullTime.away ?? 0;
        const totalGoals = home + away;

        let outcome = '';
        if (home > away) outcome = '1';
        else if (home < away) outcome = '2';
        else outcome = 'X';

        const doubleChances = {
            '1X': outcome === '1' || outcome === 'X',
            'X2': outcome === 'X' || outcome === '2',
            '12': outcome === '1' || outcome === '2'
        };

        const isUnder = totalGoals <= 1;
        const isOver = totalGoals > 1;

        if (doubleChances['1X']) isUnder ? counters['1X+U1.5']++ : counters['1X+O1.5']++;
        if (doubleChances['X2']) isUnder ? counters['X2+U1.5']++ : counters['X2+O1.5']++;
        if (doubleChances['12']) isUnder ? counters['12+U1.5']++ : counters['12+O1.5']++;

        total++;
    });

    // Calcola percentuali
    const result = {};
    for (const key in counters) {
        result[key] = {
            count: counters[key],
            percent: total ? ((counters[key] / total) * 100).toFixed(1) + '%' : '0.0%'
        };
    }

    result.total = total;
    return result;
}


function getDoubleChanceUnderOver25(matches, teamName) {
    const counters = {
        '1X+U2.5': 0,
        '1X+O2.5': 0,
        'X2+U2.5': 0,
        'X2+O2.5': 0,
        '12+U2.5': 0,
        '12+O2.5': 0
    };

    let total = 0;

    matches.forEach(match => {
        const isHome = match.homeTeam.name.toLowerCase().includes(teamName.toLowerCase());
        const isAway = match.awayTeam.name.toLowerCase().includes(teamName.toLowerCase());
        const home = match.score.fullTime.home ?? 0;
        const away = match.score.fullTime.away ?? 0;
        const totalGoals = home + away;

        let outcome = '';
        if (home > away) outcome = '1';
        else if (home < away) outcome = '2';
        else outcome = 'X';

        const doubleChances = {
            '1X': outcome === '1' || outcome === 'X',
            'X2': outcome === 'X' || outcome === '2',
            '12': outcome === '1' || outcome === '2'
        };

        const isUnder = totalGoals <= 2;
        const isOver = totalGoals > 2;

        if (doubleChances['1X']) isUnder ? counters['1X+U2.5']++ : counters['1X+O2.5']++;
        if (doubleChances['X2']) isUnder ? counters['X2+U2.5']++ : counters['X2+O2.5']++;
        if (doubleChances['12']) isUnder ? counters['12+U2.5']++ : counters['12+O2.5']++;

        total++;
    });

    const result = {};
    for (const key in counters) {
        result[key] = {
            count: counters[key],
            percent: total ? ((counters[key] / total) * 100).toFixed(1) + '%' : '0.0%'
        };
    }

    result.total = total;
    return result;
}


function getDoubleChanceUnderOver35(matches, teamName) {
    const counters = {
        '1X+U3.5': 0,
        '1X+O3.5': 0,
        'X2+U3.5': 0,
        'X2+O3.5': 0,
        '12+U3.5': 0,
        '12+O3.5': 0
    };

    let total = 0;

    matches.forEach(match => {
        const isHome = match.homeTeam.name.toLowerCase().includes(teamName.toLowerCase());
        const isAway = match.awayTeam.name.toLowerCase().includes(teamName.toLowerCase());
        const home = match.score.fullTime.home ?? 0;
        const away = match.score.fullTime.away ?? 0;
        const totalGoals = home + away;

        let outcome = '';
        if (home > away) outcome = '1';
        else if (home < away) outcome = '2';
        else outcome = 'X';

        const doubleChances = {
            '1X': outcome === '1' || outcome === 'X',
            'X2': outcome === 'X' || outcome === '2',
            '12': outcome === '1' || outcome === '2'
        };

        const isUnder = totalGoals <= 3;
        const isOver = totalGoals > 3;

        if (doubleChances['1X']) isUnder ? counters['1X+U3.5']++ : counters['1X+O3.5']++;
        if (doubleChances['X2']) isUnder ? counters['X2+U3.5']++ : counters['X2+O3.5']++;
        if (doubleChances['12']) isUnder ? counters['12+U3.5']++ : counters['12+O3.5']++;

        total++;
    });

    const result = {};
    for (const key in counters) {
        result[key] = {
            count: counters[key],
            percent: total ? ((counters[key] / total) * 100).toFixed(1) + '%' : '0.0%'
        };
    }

    result.total = total;
    return result;
}


function getDoubleChanceGoalNoGoal(matches, teamName) {
    const counters = {
        '1X+GOL': 0,
        '1X+NG': 0,
        'X2+GOL': 0,
        'X2+NG': 0,
        '12+GOL': 0,
        '12+NG': 0
    };

    let total = 0;

    matches.forEach(match => {
        const home = match.score.fullTime.home ?? 0;
        const away = match.score.fullTime.away ?? 0;

        const isGoal = home > 0 && away > 0;
        const isNoGoal = !isGoal;

        let outcome = '';
        if (home > away) outcome = '1';
        else if (home < away) outcome = '2';
        else outcome = 'X';

        const doubleChances = {
            '1X': outcome === '1' || outcome === 'X',
            'X2': outcome === 'X' || outcome === '2',
            '12': outcome === '1' || outcome === '2'
        };

        if (doubleChances['1X']) isGoal ? counters['1X+GOL']++ : counters['1X+NG']++;
        if (doubleChances['X2']) isGoal ? counters['X2+GOL']++ : counters['X2+NG']++;
        if (doubleChances['12']) isGoal ? counters['12+GOL']++ : counters['12+NG']++;

        total++;
    });

    const result = {};
    for (const key in counters) {
        result[key] = {
            count: counters[key],
            percent: total ? ((counters[key] / total) * 100).toFixed(1) + '%' : '0.0%'
        };
    }

    result.total = total;
    return result;
}

function getFixedResultUnderOverStats(matches) {
    const thresholds = [1.5, 2.5, 3.5];
    const outcomes = ['1', 'X', '2'];
    const counters = {};
    let total = 0;

    thresholds.forEach(thresh => {
        outcomes.forEach(outcome => {
            counters[`${outcome}+U${thresh}`] = 0;
            counters[`${outcome}+O${thresh}`] = 0;
        });
    });

    matches.forEach(match => {
        const home = match.score.fullTime.home ?? 0;
        const away = match.score.fullTime.away ?? 0;
        const totalGoals = home + away;

        let outcome = '';
        if (home > away) outcome = '1';
        else if (home < away) outcome = '2';
        else outcome = 'X';

        thresholds.forEach(thresh => {
            if (totalGoals <= thresh) {
                counters[`${outcome}+U${thresh}`]++;
            } else {
                counters[`${outcome}+O${thresh}`]++;
            }
        });

        total++;
    });

    const result = { total };
    for (const key in counters) {
        result[key] = {
            count: counters[key],
            percent: total ? ((counters[key] / total) * 100).toFixed(1) + '%' : '0.0%'
        };
    }

    return result;
}


function getFixedResultGoalNoGoalStats(matches) {
    const outcomes = ['1', 'X', '2'];
    const counters = {
        '1+GOL': 0, '1+NG': 0,
        'X+GOL': 0, 'X+NG': 0,
        '2+GOL': 0, '2+NG': 0
    };

    let total = 0;

    matches.forEach(match => {
        const home = match.score.fullTime.home ?? 0;
        const away = match.score.fullTime.away ?? 0;

        const isGoal = home > 0 && away > 0;
        const outcome = home > away ? '1' : home < away ? '2' : 'X';

        if (isGoal) counters[`${outcome}+GOL`]++;
        else counters[`${outcome}+NG`]++;

        total++;
    });

    const result = { total };
    for (const key in counters) {
        result[key] = {
            count: counters[key],
            percent: total ? ((counters[key] / total) * 100).toFixed(1) + '%' : '0.0%'
        };
    }

    return result;
}
function getTripleComboStats(matches) {
    const doubleChances = ['1X', 'X2', '12'];
    const goals = ['GOL', 'NG'];
    const thresholds = ['U1.5', 'O1.5'];
    const counters = {};
    let total = 0;

    doubleChances.forEach(dc => {
        thresholds.forEach(th => {
            goals.forEach(g => {
                const key = `${dc}+${th}+${g}`;
                counters[key] = 0;
            });
        });
    });



    matches.forEach(match => {
        const home = match.score.fullTime.home ?? 0;
        const away = match.score.fullTime.away ?? 0;
        const totalGoals = home + away;

        // 1X, X2, 12
        let outcome = '';
        if (home > away) outcome = '1';
        else if (home < away) outcome = '2';
        else outcome = 'X';

        const doubleChanceFlags = {
            '1X': outcome === '1' || outcome === 'X',
            'X2': outcome === 'X' || outcome === '2',
            '12': outcome === '1' || outcome === '2'
        };

        const isUnder = totalGoals <= 1;
        const isOver = totalGoals > 1;
        const isGoal = home > 0 && away > 0;
        const isNoGoal = !isGoal;

        for (const dc in doubleChanceFlags) {
            if (doubleChanceFlags[dc]) {
                if (isUnder) {
                    if (isGoal) counters[`${dc}+U1.5+GOL`]++;
                    else counters[`${dc}+U1.5+NG`]++;
                }
                if (isOver) {
                    if (isGoal) counters[`${dc}+O1.5+GOL`]++;
                    else counters[`${dc}+O1.5+NG`]++;
                }
            }
        }

        total++;
    });

    const result = { total };
    for (const key in counters) {
        result[key] = {
            count: counters[key],
            percent: total ? ((counters[key] / total) * 100).toFixed(1) + '%' : '0.0%'
        };
    }

    return result;
}


function getTripleComboStats25(matches) {
    const doubleChances = ['1X', 'X2', '12'];
    const goals = ['GOL', 'NG'];
    const thresholds = ['U2.5', 'O2.5'];
    const counters = {};
    let total = 0;

    doubleChances.forEach(dc => {
        thresholds.forEach(th => {
            goals.forEach(g => {
                const key = `${dc}+${th}+${g}`;
                counters[key] = 0;
            });
        });
    });

    matches.forEach(match => {
        const home = match.score.fullTime.home ?? 0;
        const away = match.score.fullTime.away ?? 0;
        const totalGoals = home + away;

        let outcome = '';
        if (home > away) outcome = '1';
        else if (home < away) outcome = '2';
        else outcome = 'X';

        const doubleChanceFlags = {
            '1X': outcome === '1' || outcome === 'X',
            'X2': outcome === 'X' || outcome === '2',
            '12': outcome === '1' || outcome === '2'
        };

        const isUnder = totalGoals <= 2;
        const isOver = totalGoals > 2;
        const isGoal = home > 0 && away > 0;
        const isNoGoal = !isGoal;

        for (const dc in doubleChanceFlags) {
            if (doubleChanceFlags[dc]) {
                if (isUnder) {
                    if (isGoal) counters[`${dc}+U2.5+GOL`]++;
                    else counters[`${dc}+U2.5+NG`]++;
                }
                if (isOver) {
                    if (isGoal) counters[`${dc}+O2.5+GOL`]++;
                    else counters[`${dc}+O2.5+NG`]++;
                }
            }
        }

        total++;
    });

    const result = { total };
    for (const key in counters) {
        result[key] = {
            count: counters[key],
            percent: total ? ((counters[key] / total) * 100).toFixed(1) + '%' : '0.0%'
        };
    }

    return result;
}


function getTripleComboStats35(matches) {
    const doubleChances = ['1X', 'X2', '12'];
    const goals = ['GOL', 'NG'];
    const thresholds = ['U3.5', 'O3.5'];
    const counters = {};
    let total = 0;

    doubleChances.forEach(dc => {
        thresholds.forEach(th => {
            goals.forEach(g => {
                const key = `${dc}+${th}+${g}`;
                counters[key] = 0;
            });
        });
    });

    matches.forEach(match => {
        const home = match.score.fullTime.home ?? 0;
        const away = match.score.fullTime.away ?? 0;
        const totalGoals = home + away;

        let outcome = '';
        if (home > away) outcome = '1';
        else if (home < away) outcome = '2';
        else outcome = 'X';

        const doubleChanceFlags = {
            '1X': outcome === '1' || outcome === 'X',
            'X2': outcome === 'X' || outcome === '2',
            '12': outcome === '1' || outcome === '2'
        };

        const isUnder = totalGoals <= 3;
        const isOver = totalGoals > 3;
        const isGoal = home > 0 && away > 0;
        const isNoGoal = !isGoal;

        for (const dc in doubleChanceFlags) {
            if (doubleChanceFlags[dc]) {
                if (isUnder) {
                    if (isGoal) counters[`${dc}+U3.5+GOL`]++;
                    else counters[`${dc}+U3.5+NG`]++;
                }
                if (isOver) {
                    if (isGoal) counters[`${dc}+O3.5+GOL`]++;
                    else counters[`${dc}+O3.5+NG`]++;
                }
            }
        }

        total++;
    });

    const result = { total };
    for (const key in counters) {
        result[key] = {
            count: counters[key],
            percent: total ? ((counters[key] / total) * 100).toFixed(1) + '%' : '0.0%'
        };
    }

    return result;
}


function getFixedComboStats15(matches) {
    const results = ['1', 'X', '2'];
    const thresholds = ['U1.5', 'O1.5'];
    const goals = ['GOL', 'NG'];
    const counters = {};
    let total = 0;

    results.forEach(res => {
        thresholds.forEach(th => {
            goals.forEach(g => {
                const key = `${res}+${th}+${g}`;
                counters[key] = 0;
            });
        });
    });

    matches.forEach(match => {
        const home = match.score.fullTime.home ?? 0;
        const away = match.score.fullTime.away ?? 0;
        const totalGoals = home + away;

        const outcome = home > away ? '1' : home < away ? '2' : 'X';
        const isUnder = totalGoals <= 1;
        const isOver = totalGoals > 1;
        const isGoal = home > 0 && away > 0;
        const isNoGoal = !isGoal;

        if (isUnder) {
            if (isGoal) counters[`${outcome}+U1.5+GOL`]++;
            else counters[`${outcome}+U1.5+NG`]++;
        }
        if (isOver) {
            if (isGoal) counters[`${outcome}+O1.5+GOL`]++;
            else counters[`${outcome}+O1.5+NG`]++;
        }

        total++;
    });

    const result = { total };
    for (const key in counters) {
        result[key] = {
            count: counters[key],
            percent: total ? ((counters[key] / total) * 100).toFixed(1) + '%' : '0.0%'
        };
    }

    return result;
}


function getFixedComboStats25(matches) {
    const results = ['1', 'X', '2'];
    const thresholds = ['U2.5', 'O2.5'];
    const goals = ['GOL', 'NG'];
    const counters = {};
    let total = 0;

    results.forEach(res => {
        thresholds.forEach(th => {
            goals.forEach(g => {
                const key = `${res}+${th}+${g}`;
                counters[key] = 0;
            });
        });
    });

    matches.forEach(match => {
        const home = match.score.fullTime.home ?? 0;
        const away = match.score.fullTime.away ?? 0;
        const totalGoals = home + away;

        const outcome = home > away ? '1' : home < away ? '2' : 'X';
        const isUnder = totalGoals <= 2;
        const isOver = totalGoals > 2;
        const isGoal = home > 0 && away > 0;
        const isNoGoal = !isGoal;

        if (isUnder) {
            if (isGoal) counters[`${outcome}+U2.5+GOL`]++;
            else counters[`${outcome}+U2.5+NG`]++;
        }
        if (isOver) {
            if (isGoal) counters[`${outcome}+O2.5+GOL`]++;
            else counters[`${outcome}+O2.5+NG`]++;
        }

        total++;
    });

    const result = { total };
    for (const key in counters) {
        result[key] = {
            count: counters[key],
            percent: total ? ((counters[key] / total) * 100).toFixed(1) + '%' : '0.0%'
        };
    }

    return result;
}



function getFixedComboStats35(matches) {
    const results = ['1', 'X', '2'];
    const thresholds = ['U3.5', 'O3.5'];
    const goals = ['GOL', 'NG'];
    const counters = {};
    let total = 0;

    results.forEach(res => {
        thresholds.forEach(th => {
            goals.forEach(g => {
                const key = `${res}+${th}+${g}`;
                counters[key] = 0;
            });
        });
    });

    matches.forEach(match => {
        const home = match.score.fullTime.home ?? 0;
        const away = match.score.fullTime.away ?? 0;
        const totalGoals = home + away;

        const outcome = home > away ? '1' : home < away ? '2' : 'X';
        const isUnder = totalGoals <= 3;
        const isOver = totalGoals > 3;
        const isGoal = home > 0 && away > 0;
        const isNoGoal = !isGoal;

        if (isUnder) {
            if (isGoal) counters[`${outcome}+U3.5+GOL`]++;
            else counters[`${outcome}+U3.5+NG`]++;
        }
        if (isOver) {
            if (isGoal) counters[`${outcome}+O3.5+GOL`]++;
            else counters[`${outcome}+O3.5+NG`]++;
        }

        total++;
    });

    const result = { total };
    for (const key in counters) {
        result[key] = {
            count: counters[key],
            percent: total ? ((counters[key] / total) * 100).toFixed(1) + '%' : '0.0%'
        };
    }

    return result;
}

function getEvenOddStats(matches) {
    const counters = {
        totalEven: 0, totalOdd: 0,
        homeEven: 0, homeOdd: 0,
        awayEven: 0, awayOdd: 0
    };

    let total = 0;

    matches.forEach(match => {
        const home = match.score.fullTime.home ?? 0;
        const away = match.score.fullTime.away ?? 0;
        const totalGoals = home + away;

        if (totalGoals % 2 === 0) counters.totalEven++;
        else counters.totalOdd++;

        if (home % 2 === 0) counters.homeEven++;
        else counters.homeOdd++;

        if (away % 2 === 0) counters.awayEven++;
        else counters.awayOdd++;

        total++;
    });

    const toPercent = count => total ? ((count / total) * 100).toFixed(1) + '%' : '0.0%';

    return {
        total,
        totalEven: { count: counters.totalEven, percent: toPercent(counters.totalEven) },
        totalOdd: { count: counters.totalOdd, percent: toPercent(counters.totalOdd) },
        homeEven: { count: counters.homeEven, percent: toPercent(counters.homeEven) },
        homeOdd: { count: counters.homeOdd, percent: toPercent(counters.homeOdd) },
        awayEven: { count: counters.awayEven, percent: toPercent(counters.awayEven) },
        awayOdd: { count: counters.awayOdd, percent: toPercent(counters.awayOdd) }
    };
}


function getExactScoreGaps(matches, resultSet) {
    const gaps = {};
    resultSet.forEach(score => {
        gaps[score] = null;
    });

    // ✅ Ordina dalla più recente alla più vecchia
    const sorted = [...matches].sort((a, b) => new Date(b.utcDate) - new Date(a.utcDate));

    for (let i = 0; i < sorted.length; i++) {
        const match = sorted[i];
        const home = match.score.fullTime.home ?? 0;
        const away = match.score.fullTime.away ?? 0;
        const key = `${home}-${away}`;
        if (gaps.hasOwnProperty(key) && gaps[key] === null) {
            gaps[key] = i; // quante partite fa
        }
    }

    const total = sorted.length;
    const result = {};
    for (const key in gaps) {
        result[key] = gaps[key] !== null ? gaps[key] : `Mai apparso`;
    }

    return result;
}

