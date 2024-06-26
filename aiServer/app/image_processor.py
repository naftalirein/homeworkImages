# image_processor.py
import numpy as np
import time

class image_processor:
    def __init__(self):
        time.sleep(10)
    
    def __call__(self, image):
        return np.random.randint(1,3)