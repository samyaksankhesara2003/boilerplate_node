import { Request, Response, NextFunction } from 'express';
import { constants, SupportedMenuFileType } from '@repo/config';
import { StatusCodes, ResponseMessages, sendResponse, CustomError } from '@repo/response-handler';
import { validateFileSize } from '@repo/utils';
import { restaurantMenuService } from './restaurantMenu.service';
import { CreateMenuItemBody, DeleteMenuItemQuery, getMenuItemsQuery, PineconeConfig, UpdateMenuItemBody } from './helpers/reataurant.types';

const uploadMenu = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { file } = req;
        if (file) {
            if (!constants.supportedMenuFileTypes.includes(file.mimetype as SupportedMenuFileType))
                throw new CustomError(ResponseMessages.COMMON.UNSUPPORTED_FILE_TYPE, StatusCodes.UNSUPPORTED_MEDIA_TYPE);
            validateFileSize(file.size, constants.menuFileSize);
        }

        const data = await restaurantMenuService.uploadMenu(file as Express.Multer.File);

        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.MENU.UPLOAD_SUCCESS, data);
    } catch (error) {
        next(error);
    }
};

const uploadMenuToPinecone = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const body = req.body;
        const data = await restaurantMenuService.uploadMenuToPinecone(body as PineconeConfig);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.MENU.UPLOAD_SUCCESS, data);
    } catch (error) {
        next(error);
    }
};

const getMenuItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { query } = req;
        const data = await restaurantMenuService.getMenuItems(query as unknown as getMenuItemsQuery);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.MENU.GET_SUCCESS, data);
    } catch (error) {
        next(error);
    }
};

const updateMenuItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { body } = req;
        const data = await restaurantMenuService.updateMenuItem(body as UpdateMenuItemBody);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.MENU.UPDATE_SUCCESS, data);
    } catch (error) {
        next(error);
    }
};

const createMenuItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const { body } = req;
        const data = await restaurantMenuService.createMenuItem(body as CreateMenuItemBody);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.MENU.CREATE_SUCCESS, data);
    }catch(error){
        next(error);
    }
}

const deleteMenuItem =  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const {query} = req
        const data = await restaurantMenuService.deleteMenuItem(query as unknown as DeleteMenuItemQuery)
                return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.COMMON.SUCCESS, data);

    }catch(error){
        next(error)
    }
}

export const restaurantMenuController = {
    uploadMenu,
    uploadMenuToPinecone,
    getMenuItems,
    updateMenuItem,
    createMenuItem,
    deleteMenuItem
};
