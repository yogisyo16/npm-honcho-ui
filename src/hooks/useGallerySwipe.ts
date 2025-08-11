import { useState, useEffect, useCallback } from "react";
import { Controller } from "./editor/useHonchoEditor";
import { Gallery } from "./editor/type";


export function useGallerySwipe(firebaseUid: string, initImageId: string, controller: Controller) {
    const [currentImageId, setCurrentImageId] = useState<string>(initImageId);
    const [currentImageData, setCurrentImageData] = useState<Gallery | null>(null);
    const [currentEventId, setCurrentEventId] = useState<string | null>(null);
    const [currentImageList, setCurrentImageList] = useState<Gallery[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const getImageListUntilFound = useCallback(async (imageId: string) => {
        let isFound = false;
        while (!isFound) {
            const listImage = await controller.
        }
    }, [controller]);

    useEffect(() => {
        const init = async() => {
            const gallery = await controller.onGetImage(firebaseUid, initImageId);
            if (gallery) {
                setCurrentImageData(gallery);
                setCurrentEventId(gallery.event_id);
            }

            // getImageList 
            getImageListUntilFound(gallery);
        }

        init();
    }, [currentImageId]);
}
