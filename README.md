
#### Introduction to the problem
Engineers at Huge spend a lot of their time in code. The coding challenge is a great opportunity to showcase how you approach and solve a problem. Feel free to use any programming language. Please make sure you provide the proper test coverage and prove that your solution is complete. As a minimum, use the provided test data to indicate that the solution works as expected. Please provide your solution with source code in English.

#### Drawing tool
You're given the task of writing a simple drawing tool. In a nutshell, the program reads the input.txt, executes a set of commands from the file, step by step, and produces output.txt.

At this time, the functionality of the program is quite limited but this might change in the future. At the moment, the program should support the following set of commands:

__C w h__	_Create Canvas: Should create a new canvas of width w and height h._

__L x1 y1 x2 y2__ _Create Line: Should create a new line from (x1,y1) to (x2,y2). Currently only horizontal or vertical lines are supported. Horizontal and vertical lines will be drawn using the 'x' character._

__R x1 y1 x2 y2__	_Create Rectangle: Should create a new rectangle, whose upper left corner is (x1,y1) and lower right corner is (x2,y2). Horizontal and vertical lines will be drawn using the 'x' character._

__B x y c__	_Bucket Fill: Should fill the entire area connected to (x,y) with "colour" c. The behaviour of this is the same as that of the "bucket fill" tool in paint programs._

__Please take into account that you can only draw if a canvas has been created.__
