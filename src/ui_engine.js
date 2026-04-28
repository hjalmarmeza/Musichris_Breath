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

    forgeBtn.addEventListener('click', () => {
        if (!selectedProfile || !selectedTone) {
            alert('Por favor, selecciona un destinatario y un tono ministerial.');
            return;
        }

        const context = document.getElementById('context-input').value;
        
        forgeBtn.innerText = 'FORJANDO ALIENTO...';
        forgeBtn.disabled = true;

        const payload = {
            profile: selectedProfile,
            tone: selectedTone,
            context: context,
            audio: matrix[selectedProfile].audio,
            video: matrix[selectedProfile].video,
            timestamp: new Date().toISOString()
        };

        console.log('🚀 Despachando Forja Multimodal:', payload);
        
        // Aquí integraremos el dispatch real a GitHub Actions o la API local
        setTimeout(() => {
            alert(`¡Aliento Forjado! \n\nPerfil: ${selectedProfile}\nCanción: ${matrix[selectedProfile].audio}\n\nEl sistema está preparando el video y el mensaje para WhatsApp.`);
            forgeBtn.innerText = 'FORJAR ALIENTO';
            forgeBtn.disabled = false;
        }, 2000);
    });
});
