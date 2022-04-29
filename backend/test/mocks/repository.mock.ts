import { SelectQueryBuilder } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import { Card } from '../../src/domain/entities/card';
import { Tag } from '../../src/domain/entities/tag';

class MockRepository<T> {
  private data: T[] = [];
  private classConstructor: any;

  constructor(obj: new () => T) {
    this.classConstructor = this.getType(obj.name);
  }

  find(config: any): T[] {
    return (config && config.where
      ? this.filterData(config.where)
      : this.data
    ).map((d) => plainToInstance(this.classConstructor, d));
  }

  count(config: any): number {
    return (config && config.where
      ? this.filterData(config.where)
      : this.data
    ).length;
  }

  findOne(config: any): T {
    let obj: T = undefined;

    if (!config) {
      obj = this.data[0];
    } else if (typeof config === 'number') {
      obj = this.data.find((c) => c['id'] === config);
    } else {
      obj = this.filterData(config.where)[0];
    }

    if (obj) {
      return plainToInstance(this.classConstructor, obj);
    }

    return null;
  }

  save(config: T): T {
    if (!config['id']) {
      const novoId = config['id'] || this.autoincrment();
      config['id'] = novoId;
      this.data.push(plainToInstance(this.classConstructor, config));
    } else {
      const idx = this.data.findIndex((c) => {
        return c['id'] === config['id'];
      });

      this.data.splice(idx, 1, plainToInstance(this.classConstructor, config));
    }
    return plainToInstance(this.classConstructor, config);
  }

  merge(obj1: any, obj2: any) {
    Object.assign(obj1, obj2);
  }

  delete(id: number) {
    this.data.forEach((u, idx) => {
      return u['id'] === id ? this.data.splice(idx, 1) : undefined;
    });
  }

  createQueryBuilder(): SelectQueryBuilder<T> {
    return <SelectQueryBuilder<T>>{
      where: (sql, params) => {
        return this.createQueryBuilder();
      },
      andWhere: (sql, params) => {
        return this.createQueryBuilder();
      },
      getMany: () => {
        return Promise.resolve(this.data);
      },
      getOne: () => {
        return Promise.resolve(this.data[0]);
      },
      loadRelationCountAndMap: (mapToProperty: string, relationName: string) => {
        return this.createQueryBuilder();
      }
    };
  }

  private autoincrment() {
    return this.data.length
      ? (Math.max(...this.data.map((u) => u['id'])) || 0) + 1
      : 1;
  }

  private filterData(params: any) {
    return this.data.filter(d => {
      return this.compareData(d, params);
    });
  }

  private compareData(data: any, params: any) {
    for(const key of Object.keys(params)) {
      if (params[key]) {
        if (params[key].constructor.name === 'Object') {
          return this.compareData(data[key], params[key]);
        }
        switch(params[key]._type) {
          case 'in':
            return Array.isArray(data)
              ? !!data.find(d => params[key]._value.includes(d[Object.keys(params)[0]]))
              : params[key]._value.includes(data[key]);
          case 'like':
            return data[key] && data[key].length && data[key].includes(params[key]._value.toString().replace(/\%/g, ''));
          case 'between':
            return data[key] >= params[key]._value[0] && data[key] <= params[key]._value[1]
          default:
            return data[key] === (params[key]._value || params[key]);
        }
      }
    }

    return false;
  }

  private getType(typeName: string) {
    switch (typeName) {
      case 'Tag':
        return Tag;
      case 'Card':
        return Card;
    }
  }
}

export default function createMockRepository<T>(obj: any) {
  return new MockRepository<T>(obj);
}
