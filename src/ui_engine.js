// 💎 MusiChris Breath - UI Engine v1.0
document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        splashScreen.addEventListener('click', () => {
            splashScreen.style.opacity = '0';
            setTimeout(() => splashScreen.style.display = 'none', 800);
        });
    }

    const profiles = document.querySelectorAll('.profile-item');
    const tones = document.querySelectorAll('.tone-item');
    const channels = document.querySelectorAll('.channel-item');
    const forgeBtn = document.getElementById('forge-btn');

    let selectedProfile = null;
    let selectedTone = null;
    let selectedChannel = 'youtube'; // Canal por defecto

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

    // 📡 Manejador de Canales (Corregido)
    const channels = document.querySelectorAll('.channel-item');
    handleSelection(channels, (data) => {
        selectedChannel = data.channel;
        console.log(`📡 Canal seleccionado: ${selectedChannel}`);
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

        const message = "¡Dios te bendiga! Quería compartir contigo este mensaje de aliento..."; // Aquí irá la IA real
        
        if (selectedChannel === 'youtube') {
            // Lógica de Forja de Video en Nube
            try {
                const response = await fetch(`https://api.github.com/repos/hjalmarmeza/Musichris_Breath/dispatches`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `token ${pat}`,
                        'Accept': 'application/vnd.github.v3+json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        event_type: 'forge_aliento',
                        client_payload: {
                            profile: selectedProfile,
                            tone: selectedTone,
                            context: context,
                            audio: matrix[selectedProfile].audio,
                            video: matrix[selectedProfile].video,
                            message: message
                        }
                    })
                });

                if (response.ok) {
                    alert(`¡Aliento Forjado! 🌬️💎\n\nYouTube está procesando tu video.\nCanción: ${matrix[selectedProfile].audio}`);
                } else {
                    throw new Error('Error al conectar con GitHub');
                }
            } catch (err) {
                alert(`Error: ${err.message}`);
            }
        } else {
            // Lógica de Compartir Directo (WhatsApp, etc)
            let shareUrl = "";
            const fullMessage = encodeURIComponent(`${message}\n\nEscucha esta canción para ti: ${matrix[selectedProfile].audio}`);

            switch(selectedChannel) {
                case 'whatsapp': shareUrl = `https://wa.me/?text=${fullMessage}`; break;
                case 'telegram': shareUrl = `https://t.me/share/url?url=&text=${fullMessage}`; break;
                case 'sms': shareUrl = `sms:?body=${fullMessage}`; break;
                case 'mail': shareUrl = `mailto:?subject=Un mensaje de aliento para ti&body=${fullMessage}`; break;
            }

            window.open(shareUrl, '_blank');
        }
    });
});
