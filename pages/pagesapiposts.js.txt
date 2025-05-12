// pages/api/posts.js
import { Client } from "@notionhq/client";
import dotenv from "dotenv";
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export default async function handler(req, res) {
  try {
    const { results } = await notion.databases.query({
      database_id: process.env.NOTION_DB_ID,
    });
    const posts = results.map(page => {
      const files = page.properties.Attachment?.files || [];
      const images = files.map(f => f.external?.url || f.file?.url).filter(Boolean);
      return { id: page.id, images };
    });
    res.status(200).json({ posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
