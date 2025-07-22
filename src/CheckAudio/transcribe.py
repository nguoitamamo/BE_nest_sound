import whisper
import sys, os

def AudioToText(filepath, wordFile="word.txt"):
    

    
    model = whisper.load_model("large")
    
# load audio and pad/trim it to fit 30 seconds
    audio = whisper.load_audio(filepath)
    audio = whisper.pad_or_trim(audio)

    # make log-Mel spectrogram and move to the same device as the model
    mel = whisper.log_mel_spectrogram(audio, n_mels=model.dims.n_mels).to(model.device)

    # detect the spoken language
    # _, probs = model.detect_language(mel)
    # print(f"Detected language: {max(probs, key=probs.get)}")

    # decode the audio
    options = whisper.DecodingOptions(language="vi")
    result = whisper.decode(model, mel, options)

    # print the recognized text
    recognized_text = result.text.lower()

    current_dir = os.path.dirname(__file__)  # thư mục chứa file transcribe.py
    word_path = os.path.join(current_dir, wordFile)

    with open(word_path, 'r', encoding='utf-8') as f:
        banned_words = [line.strip().lower() for line in f if line.strip()]

    for word in banned_words:
        if word in recognized_text:
            return True  # Có từ cấm

    return False  # Không có từ cấm


if __name__ == "__main__":
    import sys
    file_path = sys.argv[1]  # Lấy path từ command line
    has_banned = AudioToText(file_path)
    print("True" if has_banned else "False")
