//ts Enums
enum Size {
  Small,
  Medium,
  Large,
}

function cal(income: number) {
  if (income > 50) {
    return income * 1.2;
  }
  return income * 1.5;
}

//type aliases
type Employee = {
  readonly id: number;
  name: string;
  retire: (date: Date) => void;
};

//object
let employee: Employee = {
  id: 1,
  name: "Steven",
  retire: (date: Date) => {
    console.log("Date => ", date);
  },
};

employee.name = "TTT";
// employee.id = 4;

// Union Types
function kgToLbs(weight: number | string): number {
  // Narrwoing
  if (typeof weight === "number") {
    return weight * 2.2;
  }
  return parseFloat(weight) * 2.2;
}

// Intersection Types
type Draggable = {
  drag: () => void;
};
type Resizable = {
  resize: () => void;
};

type UIWidget = Draggable & Resizable;

let textBox: UIWidget = {
  drag: () => {},
  resize: () => {},
};

// Literal Types : Exact , specific value
type Quantity = 50 | 100;
let quantity: Quantity = 100;

// Nullable Types
function greet(name: string | null) {
  if (name) {
    console.log("test=>", name.toUpperCase());
    return;
  }
  console.log("HOla!");
}
greet(null);

// Optioanl Chaining
type Customer = {
  birthday: Date;
};

function getCustomer(id: number): Customer | null {
  return id === 0 ? null : { birthday: new Date() };
}
let customer = getCustomer(0);
// Optional property access operator
console.log(customer?.birthday);

// Nullish Coaelscing Operator
let speed: number | null = null;
let ride = {
  speed: speed ?? 30,
};

// Type Assertions   ==>  as SomeType
let phone = document.getElementById("phone") as HTMLInputElement;
phone.value;

// The unknown Type
function render(document: unknown) {
  // type narrowing
  // document.move()
}

//　Never Type
function processEvents(): never {
  while (true) {
    //read a message from a queue
  }
}

//processEvents();
// console.log("Hello World");

// OOP
class Account {
  // usage of readonly
  readonly id: number;
  owner: string;
  private _balance: number;
  nickname?: string;

  // constructor
  constructor(id: number, owner: string, balance: number) {
    this.id = id;
    this.owner = owner;
    this._balance = balance;
  }
  // method
  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Invalid amount");
    }
    this._balance += amount;
  }

  // Getters & Setters
  get balance(): number {
    return this._balance;
  }
  set balance(value: number) {
    if (value < 0) {
      throw new Error("Invalid Value");
    }
    this._balance = value;
  }
}

let account: Account = new Account(1, "Steven", 1200);
account.deposit(100);

// instanceOf
console.log(account instanceof Account); // ===> true
account.balance = 1;

//Index Signatures : create properties dynamically
class SeatAssignment {
  [seatNumber: string]: string;
}

let seats = new SeatAssignment();
seats.A1 = "Steven";
seats["A1"] = "Steven";
seats.A2 = "John";

// Static Members
class Ride {
  // a lots of properties
  private static _activeRides: number = 0;

  start() {
    Ride._activeRides++;
  }
  stop() {
    Ride._activeRides--;
  }

  static get activeRides(): number {
    return Ride._activeRides;
  }
}

let ride1 = new Ride();
ride1.start();
let ride2 = new Ride();
ride2.start();

// Abstract class and methods
abstract class Shape {
  constructor(public color: string) {}
  abstract render(): void;
}

class Circle extends Shape {
  constructor(public radius: number, color: string) {
    super(color);
  }
  override render(): void {
    console.log("Rendering a circle");
  }
}

let shape = new Circle(2, "red");
shape.render();

// Interfaces
class Calendar {
  constructor(public name: string) {}

  addEvent() {}
  removeEvent() {}
}

// Generic
class KeyValuePair<T, U> {
  constructor(public key: T, public value: U) {}
}
let pair = new KeyValuePair<string, string>("1", "Apple");

class ArrayUtils {
  wrapInArray<T>(value: T) {
    return [value];
  }
}
let utils = new ArrayUtils();
let numbers = utils.wrapInArray(1);

//Generic Constraints
function echo<T extends { name: string }>(value: T): T {
  return value;
}

// Extending Generic Classes
interface Product {
  name: string;
  price: number;
}
class Store<T> {
  private _objects: T[] = [];
  add(obj: T): void {
    this._objects.push(obj);
  }
}

let store = new Store<Product>();

class CompressibleStore<T> extends Store<T> {
  compress() {}
}
let store2 = new CompressibleStore<Product>();
store2.compress();

//Type Mapping
type ReadOnlyProduct = {
  readonly [P in keyof Product]: Product[P];
};

type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};
