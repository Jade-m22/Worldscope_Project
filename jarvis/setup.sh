#!/bin/bash
# ============================================================
#  JARVIS - Script d'installation macOS Apple Silicon
#  Testé sur M1 / M2 / M3 / M4 avec macOS 13+
# ============================================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo -e "${BLUE}╔══════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     JARVIS - Installation macOS      ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════╝${NC}"
echo ""

# ── Vérifications préalables ──────────────────────────────────
echo -e "${BLUE}[1/6]${NC} Vérification des prérequis..."

# Homebrew
if ! command -v brew &> /dev/null; then
    echo -e "  ${YELLOW}→ Installation de Homebrew...${NC}"
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi
echo -e "  ${GREEN}✓ Homebrew OK${NC}"

# Python 3.10+
if ! command -v python3 &> /dev/null; then
    echo -e "  ${YELLOW}→ Installation de Python 3.11...${NC}"
    brew install python@3.11
fi
echo -e "  ${GREEN}✓ Python OK ($(python3 --version))${NC}"

# ── Ollama ────────────────────────────────────────────────────
echo ""
echo -e "${BLUE}[2/6]${NC} Installation d'Ollama..."

if ! command -v ollama &> /dev/null; then
    echo -e "  ${YELLOW}→ Téléchargement d'Ollama...${NC}"
    brew install ollama
fi
echo -e "  ${GREEN}✓ Ollama installé${NC}"

# Démarrer Ollama en arrière-plan
echo -e "  ${YELLOW}→ Démarrage d'Ollama...${NC}"
ollama serve &>/dev/null &
OLLAMA_PID=$!
sleep 3

# Télécharger Mistral 7B
echo -e "  ${YELLOW}→ Téléchargement de Mistral 7B (~4 Go)... (patience)${NC}"
ollama pull mistral
echo -e "  ${GREEN}✓ Mistral 7B prêt${NC}"

# ── Dépendances système ───────────────────────────────────────
echo ""
echo -e "${BLUE}[3/6]${NC} Installation des dépendances système..."

brew install portaudio ffmpeg
echo -e "  ${GREEN}✓ PortAudio et FFmpeg installés${NC}"

# ── Environnement Python ──────────────────────────────────────
echo ""
echo -e "${BLUE}[4/6]${NC} Création de l'environnement Python..."

python3 -m venv .venv
source .venv/bin/activate

python -m pip install --upgrade pip --quiet

echo -e "  ${YELLOW}→ Installation des packages Python...${NC}"
if [ -f "requirements.txt" ]; then
    python -m pip install --quiet -r requirements.txt
else
    python -m pip install --quiet \
        faster-whisper \
        sounddevice \
        soundfile \
        numpy \
        requests \
        openwakeword
fi

echo -e "  ${YELLOW}→ Installation de Piper CLI (piper-tts)...${NC}"
python -m pip install --quiet piper-tts
echo -e "  ${GREEN}✓ Packages Python et Piper CLI installés${NC}"

# ── Modèle Piper TTS ─────────────────────────────────────────
echo ""
echo -e "${BLUE}[5/6]${NC} Téléchargement du modèle de voix française (Piper)..."

mkdir -p models/piper
cd models/piper

PIPER_BASE="https://huggingface.co/rhasspy/piper-voices/resolve/v1.0.0/fr/fr_FR/siwis/medium"

if [ ! -f "fr_FR-siwis-medium.onnx" ]; then
    echo -e "  ${YELLOW}→ Téléchargement du modèle voix...${NC}"
    curl -L -o fr_FR-siwis-medium.onnx "${PIPER_BASE}/fr_FR-siwis-medium.onnx" --progress-bar
    curl -L -o fr_FR-siwis-medium.onnx.json "${PIPER_BASE}/fr_FR-siwis-medium.onnx.json" --progress-bar
    echo -e "  ${GREEN}✓ Modèle vocal Piper téléchargé${NC}"
else
    echo -e "  ${GREEN}✓ Modèle vocal déjà présent${NC}"
fi

cd ../..

echo -e "  ${YELLOW}→ Téléchargement des modèles OpenWakeWord...${NC}"
python -c "from openwakeword.utils import download_models; download_models(model_names=['hey_mycroft'])"
echo -e "  ${GREEN}✓ Modèles OpenWakeWord disponibles${NC}"

# ── Permissions micro ─────────────────────────────────────────
echo ""
echo -e "${BLUE}[6/6]${NC} Configuration des permissions..."
echo -e "  ${YELLOW}⚠️  Sur macOS, vous devrez autoriser l'accès au microphone${NC}"
echo -e "     lors du premier lancement de JARVIS (pop-up système)."
echo ""

# Créer les dossiers nécessaires
mkdir -p memory logs

# ── Résumé ────────────────────────────────────────────────────
echo -e "${GREEN}╔══════════════════════════════════════╗${NC}"
echo -e "${GREEN}║      Installation terminée ! ✅      ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════╝${NC}"
echo ""
echo -e "  Pour lancer JARVIS :"
echo -e "  ${BLUE}source .venv/bin/activate${NC}"
echo -e "  ${BLUE}python jarvis.py${NC}"
echo ""
echo -e "  ${YELLOW}Note :${NC} Dites ${BLUE}'Hey Jarvis'${NC} pour l'activer."
echo -e "         (ou appuyez sur Entrée si OpenWakeWord n'est pas disponible)"
echo ""
