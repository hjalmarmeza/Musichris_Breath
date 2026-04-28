// 💎 MusiChris Breath - UI Engine v1.0
document.addEventListener('DOMContentLoaded', () => {
    const profiles = document.querySelectorAll('#profile-selector .selector-item');
    const tones = document.querySelectorAll('#tone-selector .selector-item');
    const forgeBtn = document.getElementById('forge-btn');

    let selectedProfile = null;
    let selectedTone = null;

    // 🎼 Matriz Maestra - Audio y Video
    const matrix = {
        paternal: { audio: "Manos de Gracia..mp3", video: "320766_medium.mp4" },
        legado: { audio: "Tu Mirada Me Sigue.mp3", video: "64137-509542890_medium.mp4" },
        autoridad: { audio: "León y Cordero.mp3", video: "41300-429396316_medium.mp4" },
        guerra: { audio: "La Voz de Jehová.mp3", video: "63736-507811774_medium.mp4" },
        sanidad: { audio: "Consumado es.mp3", video: "144967-785786009_medium.mp4" },
        amistad: { audio: "Emmanuel.mp3", video: "149375-796105802_medium.mp4" },
        mision: { audio: "La ofrenda real.mp3", video: "199379-910162329_medium.mp4" },
        sabiduria: { audio: "Quietud.mp3", video: "203872-922675721_medium.mp4" }
    };

    // Helper to handle selection
    const handleSelection = (elements, callback) => {
        elements.forEach(el => {
            el.addEventListener('click', () => {
                elements.forEach(item => item.classList.remove('active'));
                el.classList.add('active');
                callback(el.dataset);
            });
        });
    };

    handleSelection(profiles, (data) => {
        selectedProfile = data.profile;
        console.log(`👤 Perfil seleccionado: ${selectedProfile} (Canción: ${matrix[selectedProfile].audio})`);
    });

    handleSelection(tones, (data) => {
        selectedTone = data.tone;
        console.log(`🎨 Tono seleccionado: ${selectedTone}`);
    });

    forgeBtn.addEventListener('click', async () => {
        if (!selectedProfile || !selectedTone) {
            alert('Por favor, selecciona un destinatario y un tono ministerial.');
            return;
        }

        const context = document.getElementById('context-input').value;
        
        forgeBtn.innerText = 'FORJANDO ALIENTO...';
        forgeBtn.disabled = true;

        // 🔐 Gestión de Autenticación
        let pat = localStorage.getItem('musichris_pat');
        if (!pat) {
            pat = prompt('⚠️ Por favor, ingresa tu GitHub Personal Access Token (PAT) para activar la forja ministerial:');
            if (pat) localStorage.setItem('musichris_pat', pat);
            else {
                alert('Se requiere el Token para forjar el aliento.');
                forgeBtn.innerText = 'FORJAR ALIENTO';
                forgeBtn.disabled = false;
                return;
            }
        }

        const payload = {
            event_type: 'forge_aliento',
            client_payload: {
                profile: selectedProfile,
                tone: selectedTone,
                context: context,
                audio: matrix[selectedProfile].audio,
                video: matrix[selectedProfile].video,
                message: "Generando mensaje ministerial..." // Aquí se inyectará el resultado de AI_Engine
            }
        };

        console.log('🚀 Despachando Forja Real a GitHub:', payload);
        
        try {
            const response = await fetch(`https://api.github.com/repos/hjalmarmeza/Musichris_Breath/dispatches`, {
                method: 'POST',
                headers: {
                    'Authorization': `token ${pat}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert(`¡Aliento Forjado con Éxito! 🌬️💎\n\nGitHub está procesando el video para YouTube.\nPerfil: ${selectedProfile}\nCanción: ${matrix[selectedProfile].audio}`);
            } else {
                const error = await response.json();
                throw new Error(error.message || 'Error en el despacho');
            }
        } catch (err) {
            console.error('❌ Error en la Forja:', err);
            alert(`Error al conectar con GitHub: ${err.message}`);
            if (err.message.includes('Unauthorized')) localStorage.removeItem('musichris_pat');
        } finally {
            forgeBtn.innerText = 'FORJAR ALIENTO';
            forgeBtn.disabled = false;
        }
    });
});
