/// <reference types="types-for-adobe/AfterEffects/22.0" />

// Define types for better TypeScript support
interface AEItem {
  id: number;
  name: string;
  typeName?: string;
  selected?: boolean;
  frameRate?: number;
  duration?: number;
  width?: number;
  height?: number;
  numLayers?: number;
  layer?: () => {
    index: number;
    name: string;
    autoOrient: boolean;
    inPoint: number;
    outPoint: number;
    startTime: number;
    transform: {
      anchorPoint: {
        isTimeVarying: boolean;
        value: [number, number, number];
      };
      position: {
        isTimeVarying: boolean;
        value: [number, number, number];
      };
      scale: {
        isTimeVarying: boolean;
        value: [number, number, number];
      };
      rotation: {
        isTimeVarying: boolean;
        value: number;
      };
      opacity: {
        isTimeVarying: boolean;
        value: number;
      };
    };
  };
}

interface AEProject {
  numItems: number;
  items: AEItem[];
  itemByID: (id: number) => AEItem | undefined;
  activeItem: AEItem | null;
}

interface AEApp {
  project: AEProject;
  beginUndoGroup: (name: string) => void;
  endUndoGroup: () => void;
}

// Create the mock
const createAEMock = (): AEApp => {
  const mock = {
    project: {
      numItems: 2,
      items: [
        {
          id: 1,
          name: "Comp 1",
          typeName: "Composition",
          selected: false,
          frameRate: 30,
          duration: 5,
          width: 1920,
          height: 1080,
          numLayers: 1,
          layer: () => ({
            index: 1,
            name: "Layer 1",
            autoOrient: false,
            inPoint: 0,
            outPoint: 5,
            startTime: 0,
            transform: {
              anchorPoint: {
                isTimeVarying: false,
                value: [0, 0, 0] as [number, number, number],
              },
              position: {
                isTimeVarying: false,
                value: [0, 0, 0] as [number, number, number],
              },
              scale: {
                isTimeVarying: false,
                value: [100, 100, 100] as [number, number, number],
              },
              rotation: { isTimeVarying: false, value: 0 },
              opacity: { isTimeVarying: false, value: 100 },
            },
          }),
        },
        { id: 2, name: "Comp 2", typeName: "Composition", selected: false },
      ],
      itemByID: function (id: number) {
        return this.items.find((item) => item.id === id);
      },
      activeItem: null,
    },
    beginUndoGroup: jest.fn(),
    endUndoGroup: jest.fn(),
  };

  // Make mock available globally as both app and mockApp
  (global as any).app = mock;
  (global as any).mockApp = mock;

  return mock;
};

// Extend global type
declare global {
  var mockApp: AEApp;
}

export { createAEMock, type AEApp, type AEProject, type AEItem };
