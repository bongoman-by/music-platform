import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTrackDto } from './dto/create-track.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { Track, TrackDocument } from './schemas/track.schema';
import * as mongoose from 'mongoose';
import { FileService, FileType } from '../file/file.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService,
  ) {}
  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.PICTURE, picture);
    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });
    return track;
  }

  async getAll(count = 20, offset = 0): Promise<Track[]> {
    return await this.trackModel
      .find()
      .skip(Number(offset))
      .limit(Number(count));
  }

  async search(query: string): Promise<Track[]> {
    return await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
  }

  async getOne(id: mongoose.Schema.Types.ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments');
    return track;
  }

  async delete(id: mongoose.Schema.Types.ObjectId): Promise<Track> {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track;
  }

  async addComment(dto): Promise<Comment> {
    const comment = await this.commentModel.create(dto);
    const track = await this.trackModel.findById(dto.trackId);
    track.comments.push(comment.id);
    await track.save();
    return comment;
  }

  async listen(id: mongoose.Schema.Types.ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    track.save();
    return track;
  }
}
