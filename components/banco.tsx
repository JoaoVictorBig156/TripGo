
import * as SQLite from 'expo-sqlite';

export async function criarTabelas(
    db: SQLite.SQLiteDatabase
): Promise<void> {

    db.execSync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS viagens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      local TEXT NOT NULL,
      data_ida TEXT NOT NULL,
      data_volta TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS passeios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_viagem INTEGER NOT NULL,
      titulo TEXT NOT NULL,
      descricao TEXT,
      data TEXT,
      valor REAL NOT NULL DEFAULT 0,
      FOREIGN KEY (id_viagem)
        REFERENCES viagens(id)
        ON DELETE CASCADE
    );
  `);

    console.log('Tabelas criadas com sucesso!');
}
export function adicionarViagem(
    db: SQLite.SQLiteDatabase,
    local: string,
    dataIda: string,
    dataVolta: string
) {
    return db.runSync(
        `INSERT INTO viagens (local, data_ida, data_volta)
     VALUES (?, ?, ?)`,
        [local, dataIda, dataVolta]
    );
}

export function listarViagens(
    db: SQLite.SQLiteDatabase
) {
    return db.getAllSync<{
        id: number;
        local: string;
        data_ida: string;
        data_volta: string;
    }>(
        'SELECT * FROM viagens ORDER BY id DESC'
    );
}

export function atualizarViagem(
    db: SQLite.SQLiteDatabase,
    id: number,
    local: string,
    dataIda: string,
    dataVolta: string
) {
    return db.runSync(
        `UPDATE viagens
     SET local = ?, data_ida = ?, data_volta = ?
     WHERE id = ?`,
        [local, dataIda, dataVolta, id]
    );
}

export function excluirViagem(
    db: SQLite.SQLiteDatabase,
    id: number
) {
    return db.runSync(
        'DELETE FROM viagens WHERE id = ?',
        [id]
    );
}

export function listarViagensComTotal(
  db: SQLite.SQLiteDatabase
) {
  return db.getAllSync<{
    id: number;
    local: string;
    data_ida: string;
    data_volta: string;
    valor_total: number;
  }>(`
    SELECT
      viagens.id,
      viagens.local,
      viagens.data_ida,
      viagens.data_volta,
      COALESCE(SUM(passeios.valor), 0) AS valor_total
    FROM viagens
    LEFT JOIN passeios
      ON viagens.id = passeios.id_viagem
    GROUP BY viagens.id
    ORDER BY viagens.id DESC
  `);

  
}


// CADASTRAR um passeio
export function adicionarPasseio(
  db: SQLite.SQLiteDatabase,
  idViagem: number,
  titulo: string,
  descricao: string,
  data: string,
  valor: number
) {
  return db.runSync(
    `INSERT INTO passeios
    (id_viagem, titulo, descricao, data, valor)
    VALUES (?, ?, ?, ?, ?)`,
    [idViagem, titulo, descricao, data, valor]
  );
}

// LISTAR passeios de uma viagem
export function listarPasseios(
  db: SQLite.SQLiteDatabase,
  idViagem: number
) {
  return db.getAllSync<{
    id: number;
    id_viagem: number;
    titulo: string;
    descricao: string | null;
    data: string | null;
    valor: number;
  }>(
    'SELECT * FROM passeios WHERE id_viagem = ? ORDER BY id DESC',
    [idViagem]
  );
}

// ATUALIZAR um passeio
export function atualizarPasseio(
  db: SQLite.SQLiteDatabase,
  id: number,
  titulo: string,
  descricao: string,
  data: string,
  valor: number
) {
  return db.runSync(
    `UPDATE passeios
     SET titulo = ?, descricao = ?, data = ?, valor = ?
     WHERE id = ?`,
    [titulo, descricao, data, valor, id]
  );
}

// EXCLUIR um passeio
export function excluirPasseio(
  db: SQLite.SQLiteDatabase,
  id: number
) {
  return db.runSync(
    'DELETE FROM passeios WHERE id = ?',
    [id]
  );
}

// CALCULAR o total dos passeios
export function calcularTotal(
  db: SQLite.SQLiteDatabase,
  idViagem: number
) {
  const resultado = db.getFirstSync<{
    valor_total: number | null;
  }>(
    'SELECT SUM(valor) AS valor_total FROM passeios WHERE id_viagem = ?',
    [idViagem]
  );

  return resultado?.valor_total ?? 0;
}
