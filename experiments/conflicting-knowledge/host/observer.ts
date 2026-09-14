import * as real from 'real-vscode';
export let handler: any;
export let record: any = null;
export let selectedId: string | null = null;
export function setRecord(value: any) { record = value; }
export function wrapModel(model: any) {
  return new Proxy({}, { get(_target, prop) {
    const target = model;
    if (prop !== 'sendRequest') { const value = target[prop]; return typeof value === 'function' ? value.bind(target) : value; }
    return async (messages: any, options: any, token: any) => {
      if (selectedId && selectedId !== target.id) throw new Error('Model changed during baseline');
      selectedId = target.id;
      const call: any = { model: { id: target.id, family: target.family, version: target.version, vendor: target.vendor }, messages, options, response: '', started: new Date().toISOString() };
      record?.calls.push(call);
      try {
        const response = await target.sendRequest(messages, options, token);
        const sourceText = response.text;
        return { text: (async function* () {
          try { for await (const text of sourceText) { call.response += text; yield text; } }
          catch (error) { call.error = String(error); throw error; }
          finally { call.finished = new Date().toISOString(); }
        })() };
      } catch (error) { call.error = String(error); throw error; }
    };
  }});
}
export const lm = { selectChatModels: async (selector: any) => (await real.lm.selectChatModels(selector)).map(wrapModel) };
export const chat = { createChatParticipant: (_id: string, callback: any) => { handler = callback; return { dispose() {} }; } };
export * from 'real-vscode';
