import React, { useState, useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { ResizableBox } from 'react-resizable';

const ItemType = {
    IMAGE: 'image'
};

type ImageItem = {
    id: string;
    top: number;
    left: number;
    src: string;
    width: number;
    height: number;
};

type DraggableImageProps = {
    id: string;
    left: number;
    top: number;
    src: string;
    moveImage: (id: string, left: number, top: number) => void;
    removeImage: (id: string) => void;
    updateSize: (id: string, width: number, height: number) => void;
};

const DraggableImage: React.FC<DraggableImageProps> = ({ id, left, top, src, moveImage,removeImage,updateSize }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, drag,preview] = useDrag({
        type: ItemType.IMAGE,
        item: { id, left, top },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    });

    drag(ref);
    preview(ref);

    return (
        <div ref={ref} style={{ position: 'absolute', left, top }} className="cursor-move">
            <button onClick={() => removeImage(id)} className="text-white bg-red-500 hover:bg-red-700 font-bold p-1 rounded-full absolute right-0 top-0 z-10">X</button>
            <ResizableBox
                width={200}
                height={200}
                handle={(h) => <span className={`react-resizable-handle react-resizable-handle-${h}`} />}
                onResizeStop={(event, { size }) => updateSize(id, size.width, size.height)}
                minConstraints={[100, 100]} // Minimum size constraints
                maxConstraints={[300, 300]} // Maximum size constraints
            >
                <img src={src} alt="Uploaded" style={{ width: '100%', height: '100%' }} />
            </ResizableBox>
        </div>
    );
};

const ImageBoard: React.FC = () => {
    const [items, setItems] = useState<ImageItem[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);  // Ensure this is defined correctly

    const [, drop] = useDrop({
        accept: ItemType.IMAGE,
        drop: (item: { id: string, left: number, top: number }, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset()!;
            moveImage(item.id, item.left + delta.x, item.top + delta.y);
        }
    });

    const moveImage = (id: string, left: number, top: number) => {
        setItems(items =>
            items.map(item => (item.id === id ? { ...item, left, top } : item))
        );
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            Array.from(event.target.files).forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    addItem(e.target!.result as string);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (id: string) => {
        setItems(items => items.filter(item => item.id !== id));
    };


    const addItem = (src: string) => {
        const newItem = { id: uuidv4(), top: 50, left: 50, src, width: 200, height: 200 };
        setItems(prev => [...prev, newItem]);
    };

    const updateSize = (id: string, width: number, height: number) => {
        setItems(items =>
            items.map(item => item.id === id ? { ...item, width, height } : item)
        );
    };
    return (
        <div ref={drop} className="relative w-full h-96 bg-gray-200">
            {items.map(item => (
                <DraggableImage key={item.id} id={item.id} left={item.left} top={item.top} src={item.src} moveImage={moveImage} removeImage={removeImage} updateSize={updateSize} />
            ))}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                multiple
            />
            <button onClick={() => fileInputRef.current?.click()} className="absolute top-0 left-0 p-2 text-white bg-blue-500 rounded">
                Upload Image
            </button>
        </div>
    );
};

export default ImageBoard;
