export interface Action {
  args: {
    [name: string]: string,
  }
  func: () => any;
}

export interface Command {
  [commandName: string]: {
    [actionName: string]: Action
  }
}
