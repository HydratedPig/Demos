import type { IMyInterface, MyType, TupleType, UnionType } from './type';
import { MyEnum, MyEnum2 } from './type'

class MyBaseClass {
  // # 语法糖要注意，生成的对象不应该被 proxy 包裹，否则会导致无法访问私有属性
  #myProperty: string;
  constructor(field: string) {
    this.#myProperty = field;
  }

  get myProperty() {
    return this.#myProperty
  }

  public myMethod(): void {
    console.log(this.myProperty);
  }
}

class MyClass extends MyBaseClass {
  constructor(field: string) {
    super(field)
  }

  get myObject(): IMyInterface {
    return {
      field: 'example'
    }
  }

  get myVariable(): MyType {
    return 'MyType';
  }

  get myTuple(): TupleType {
    return ['example', 123];
  }

  get myUnion(): UnionType {
    return Math.random() > 0.5 ? 'MyType' : 456;
  }

  get myEnum1(): MyEnum {
    return MyEnum.E1;
  }


  get myEnum2(): MyEnum2 {
    return MyEnum2.E1;
  }
}

function main() {
  const cls = new MyClass('field')
  console.log(cls)
}

main()