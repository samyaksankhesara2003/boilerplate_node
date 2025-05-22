import { Bookmark } from '@repo/db';
import { log } from '@repo/logger';
import { IAddBookmarkParams, IListBookmarksParams } from './helpers/bookmark.types';


/** 
 * @author Sanjay Balai
 * @description Add a new bookmark
 */
const addUpdateBookmarkService = async (params: IAddBookmarkParams) => {
    try {
        const { user_id, target_id, target_type } = params;
           const existingBookmark = await Bookmark.query()
             .where({
               user_id: user_id,
               target_id: target_id,
               target_type: target_type,
             })
             .first();

           if (existingBookmark) {
           return await existingBookmark.$query().delete();
           }

           return await Bookmark.query().insert(params);
    } catch (error) {
      log.error('addBookmarkService Catch: ', error);
      throw error;
    }
 
};

/**
 * @author Sanjay Balai
 * @description List bookmarks for a user
 */
const listBookmarksService = async (params: IListBookmarksParams) => {
    try{
        const { user_id, target_type } = params;
        const query = Bookmark.query()
            .where('user_id', user_id!)
            .withGraphFetched('user');

    if (target_type) {
        query.where('target_type', target_type);
    }

    return await query;
    }catch (error) {
      log.error('listBookmarksService Catch: ', error);
      throw error;
    }
};

export const bookmarkService = {
    addUpdateBookmarkService,
    listBookmarksService
}; 