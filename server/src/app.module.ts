import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackModule } from './track/track.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    TrackModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.y2svr.mongodb.net/music-platform?retryWrites=true&w=majority',
    ),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
