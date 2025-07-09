import { 
  users, content, genres, categories, contentGenres, contentCategories, userRatings,
  type User, type InsertUser, type Content, type InsertContent, 
  type Genre, type InsertGenre, type Category, type InsertCategory
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, ilike, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Content operations
  getContent(id: number): Promise<Content | undefined>;
  getContentByType(type: string, page: number, limit: number, filters?: any): Promise<{ content: Content[], total: number }>;
  createContent(content: InsertContent): Promise<Content>;
  updateContent(id: number, content: Partial<InsertContent>): Promise<Content>;
  deleteContent(id: number): Promise<boolean>;
  searchContent(query: string, type?: string): Promise<Content[]>;
  
  // Genre operations
  getAllGenres(): Promise<Genre[]>;
  createGenre(genre: InsertGenre): Promise<Genre>;
  
  // Category operations
  getAllCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Content relationships
  addContentGenre(contentId: number, genreId: number): Promise<void>;
  addContentCategory(contentId: number, categoryId: number): Promise<void>;
  
  // Stats
  getContentStats(): Promise<{ movies: number, series: number, tv: number, misc: number }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getContent(id: number): Promise<Content | undefined> {
    const [content] = await db.select().from(content).where(eq(content.id, id));
    return content || undefined;
  }

  async getContentByType(type: string, page: number = 1, limit: number = 20, filters?: any): Promise<{ content: Content[], total: number }> {
    let query = db.select().from(content).where(
      and(
        eq(content.type, type),
        eq(content.isActive, true)
      )
    );

    // Apply filters
    if (filters) {
      if (filters.year) {
        query = query.where(eq(content.year, parseInt(filters.year)));
      }
      if (filters.language) {
        query = query.where(eq(content.language, filters.language));
      }
      if (filters.quality) {
        query = query.where(eq(content.quality, filters.quality));
      }
      if (filters.resolution) {
        query = query.where(eq(content.resolution, filters.resolution));
      }
      if (filters.rating) {
        query = query.where(sql`${content.rating} >= ${filters.rating}`);
      }
    }

    const offset = (page - 1) * limit;
    const contentItems = await query
      .orderBy(desc(content.createdAt))
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db.select({ count: sql<number>`count(*)` }).from(content).where(
      and(
        eq(content.type, type),
        eq(content.isActive, true)
      )
    );

    return {
      content: contentItems,
      total: count
    };
  }

  async createContent(insertContent: InsertContent): Promise<Content> {
    const [content] = await db.insert(content).values(insertContent).returning();
    return content;
  }

  async updateContent(id: number, updateContent: Partial<InsertContent>): Promise<Content> {
    const [content] = await db.update(content)
      .set({ ...updateContent, updatedAt: new Date() })
      .where(eq(content.id, id))
      .returning();
    return content;
  }

  async deleteContent(id: number): Promise<boolean> {
    const result = await db.update(content)
      .set({ isActive: false })
      .where(eq(content.id, id));
    return result.rowCount > 0;
  }

  async searchContent(query: string, type?: string): Promise<Content[]> {
    let searchQuery = db.select().from(content).where(
      and(
        eq(content.isActive, true),
        sql`(${content.title} ILIKE ${`%${query}%`} OR ${content.titleArabic} ILIKE ${`%${query}%`})`
      )
    );

    if (type) {
      searchQuery = searchQuery.where(eq(content.type, type));
    }

    return await searchQuery.orderBy(desc(content.createdAt)).limit(50);
  }

  async getAllGenres(): Promise<Genre[]> {
    return await db.select().from(genres);
  }

  async createGenre(insertGenre: InsertGenre): Promise<Genre> {
    const [genre] = await db.insert(genres).values(insertGenre).returning();
    return genre;
  }

  async getAllCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db.insert(categories).values(insertCategory).returning();
    return category;
  }

  async addContentGenre(contentId: number, genreId: number): Promise<void> {
    await db.insert(contentGenres).values({ contentId, genreId });
  }

  async addContentCategory(contentId: number, categoryId: number): Promise<void> {
    await db.insert(contentCategories).values({ contentId, categoryId });
  }

  async getContentStats(): Promise<{ movies: number, series: number, tv: number, misc: number }> {
    const stats = await db.select({
      type: content.type,
      count: sql<number>`count(*)`
    }).from(content)
      .where(eq(content.isActive, true))
      .groupBy(content.type);

    const result = { movies: 0, series: 0, tv: 0, misc: 0 };
    stats.forEach(stat => {
      if (stat.type === 'movie') result.movies = stat.count;
      else if (stat.type === 'series') result.series = stat.count;
      else if (stat.type === 'tv') result.tv = stat.count;
      else if (stat.type === 'misc') result.misc = stat.count;
    });

    return result;
  }
}

export const storage = new DatabaseStorage();
