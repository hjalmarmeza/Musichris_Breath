// 💎 MusiChris Breath - UI Engine v1.0
document.addEventListener('DOMContentLoaded', () => {
    const profiles = document.querySelectorAll('.profile-item');
    const tones = document.querySelectorAll('.tone-item');
    const channelElements = document.querySelectorAll('.channel-item');
    const forgeBtn = document.getElementById('forge-btn');

    let selectedProfile = null;
    let selectedTone = null;
    let selectedChannel = 'youtube'; // Canal por defecto

    // 🎼 Matriz Maestra - Audio y Video (Puntos de Clímax Ministerial)
    const matrix = {
        paternal: { audio: "Manos_de_Gracia.mp3", video: "320766_medium.mp4", start: "55" },
        legado: { audio: "Tu_Mirada_Me_Sigue.mp3", video: "64137-509542890_medium.mp4", start: "65" },
        autoridad: { audio: "Leon_y_Cordero.mp3", video: "41300-429396316_medium.mp4", start: "48" },
        guerra: { audio: "La_Voz_de_Jehova.mp3", video: "63736-507811774_medium.mp4", start: "52" },
        sanidad: { audio: "Consumado_es.mp3", video: "144967-785786009_medium.mp4", start: "70" },
        amistad: { audio: "Emmanuel.mp3", video: "149375-796105802_medium.mp4", start: "45" },
        mision: { audio: "La_ofrenda_real.mp3", video: "199379-910162329_medium.mp4", start: "58" },
        sabiduria: { audio: "Quietud.mp3", video: "203872-922675721_medium.mp4", start: "30" }
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
        console.log(`👤 Perfil seleccionado: ${selectedProfile}`);
    });

    handleSelection(tones, (data) => {
        selectedTone = data.tone;
        console.log(`🎨 Tono seleccionado: ${selectedTone}`);
    });

    // 📡 Manejador de Canales (Usa la constante declarada arriba)
    handleSelection(channelElements, (data) => {
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
            pat = prompt('⚠️ Por favor, ingresa tu GitHub Personal Access Token (PAT):');
            if (pat) localStorage.setItem('musichris_pat', pat);
            else {
                forgeBtn.innerText = 'FORJAR ALIENTO';
                forgeBtn.disabled = false;
                return;
            }
        }

        // 📝 Generación de Mensaje Ministerial Enriquecido
        const songName = matrix[selectedProfile].audio.replace(/_/g, ' ').replace('.mp3', '');
        const baseMessage = `✨ *UN MENSAJE DE ALIENTO PARA TI* ✨\n\n¡Dios te bendiga! Quería compartir contigo esta palabra de fe y esperanza. 🙏\n\n🎶 *Escucha esta canción seleccionada especialmente para ti:* \n"${songName}"\n\n🌬️ *MusiChris Breath - El Soplo de Vida*\n\nQue este aliento fortalezca tu corazón hoy. ❤️`;
        
        if (selectedChannel === 'youtube') {
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
                            start: matrix[selectedProfile].start, // 🚀 Clímax activado
                            message: baseMessage.replace(/\*/g, '') // Limpiar markdown para video
                        }
                    })
                });

                if (response.ok) {
                    alert(`¡Misión Aceptada! 🌬️💎\n\nEl servidor está forjando tu video comenzando en el CLÍMAX de la canción.`);
                } else {
                    throw new Error('Error de conexión con el servidor de forja.');
                }
            } catch (err) {
                alert(`Error: ${err.message}`);
            }
        } else {
            const encodedMsg = encodeURIComponent(baseMessage);
            let shareUrl = "";

            switch(selectedChannel) {
                case 'whatsapp': shareUrl = `https://wa.me/?text=${encodedMsg}`; break;
                case 'telegram': shareUrl = `https://t.me/share/url?url=&text=${encodedMsg}`; break;
                case 'sms': shareUrl = `sms:?body=${encodedMsg}`; break;
                case 'mail': shareUrl = `mailto:?subject=Un mensaje de aliento para ti&body=${encodedMsg}`; break;
            }

            window.open(shareUrl, '_blank');
        }
        
        forgeBtn.innerText = 'FORJAR ALIENTO';
        forgeBtn.disabled = false;
    });
});
