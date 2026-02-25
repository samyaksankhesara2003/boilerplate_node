import { Bookmark } from '@repo/db';
import { log } from '@repo/logger';
import { IAddBookmarkParams, IListBookmarksParams } from './helpers/bookmark.types';

/**
 * @author Sanjay Balai
 * @description Add a new bookmark
 */
const addUpdateBookmark = async (params: IAddBookmarkParams) => {
    try {
        const existingBookmark = await Bookmark.query()
            .where({ ...params })
            .first();

        if (existingBookmark) {
            const deletedBookmark = await existingBookmark.$query().delete();
            return deletedBookmark;
        }

        const newBookmark = await Bookmark.query().insert(params);
        return newBookmark;
    } catch (error) {
        log.error('addUpdateBookmark Catch: ', error);
        throw error;
    }
};

/**
 * @author Sanjay Balai
 * @description List bookmarks for a user
 */
const listBookmarks = async (params: IListBookmarksParams) => {
    try {
        const { user_id, target_type } = params;
        const query = Bookmark.query().where('user_id', user_id!).withGraphFetched('user');

        if (target_type) query.where('target_type', target_type);

        const bookmarks = await query;
        return bookmarks;
    } catch (error) {
        log.error('listBookmarks Catch: ', error);
        throw error;
    }
};

export const bookmarkService = {
    addUpdateBookmark,
    listBookmarks
};
