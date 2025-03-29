import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import DataSourceOptionsParams, { connnectionParams } from '../../../ormconfig';

/**
 * TypeORM 0,4 之前可以用 connnectionParams ，0,4 之后必须用 DataSource类型的
 */

@Module({
  imports: [TypeOrmModule.forRoot(DataSourceOptionsParams.options)],
})
export class TypeormModule {
  constructor(private dataSource: DataSource) {}
}
