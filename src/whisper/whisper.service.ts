import { Injectable } from '@nestjs/common';
import { CreateWhisperDto } from './dto/create-whisper.dto.js';
import { UpdateWhisperDto } from './dto/update-whisper.dto.js';
import * as fs from 'fs/promises';
import OpenAI from 'openai';
import * as f from 'fs';
import * as path from 'path';
@Injectable()
export class WhisperService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }


  async transcribeAudio(filePath: string): Promise<string> {
    try {
      const response = await this.openai.audio.transcriptions.create({
        file: f.createReadStream(filePath),
        model: 'whisper-1',
        language: 'vi',
        response_format: 'text'
      });
      //@ts-ignore
      return response.text;
    } catch (error) {
      console.error('Error during transcription:', error);
      throw new Error('Failed to transcribe audio');
    }
  }

  async checkViolation(text: string, badWordsFilePath: string): Promise<boolean> {
    const badWords = await fs.readFile(badWordsFilePath, 'utf-8');
    const wordList = badWords.split(/\r?\n/).map(w => w.trim().toLowerCase());

    const lowerText = text.toLowerCase();

    return wordList.some(word => lowerText.includes(word));
  }


  async checkFile(filePath: string) {
    const absolutePath = path.resolve(filePath);

    const text = await this.transcribeAudio(absolutePath);
    const isViolation = await this.checkViolation(
      text,
      path.join(__dirname, 'badwords.txt'),
    );

    return {
      transcribedText: text,
      violation: isViolation,
    };
  }


  create(createWhisperDto: CreateWhisperDto) {
    return 'This action adds a new whisper';
  }

  findAll() {
    return `This action returns all whisper`;
  }

  findOne(id: number) {
    return `This action returns a #${id} whisper`;
  }

  update(id: number, updateWhisperDto: UpdateWhisperDto) {
    return `This action updates a #${id} whisper`;
  }

  remove(id: number) {
    return `This action removes a #${id} whisper`;
  }
}
