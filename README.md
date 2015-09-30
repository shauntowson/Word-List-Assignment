# Word-List Application

### The Problem

##### I was given the following problem to solve by a company a family member of mine belongs to:

Write a program with a simple UI (in C#, Delphi or Java) that calls a procedure which takes four parameters as follows:

* **DictionaryFile** - the file name of a text file containing four letter words 
* **StartWord** - a four letter word (that you can assume is found in the DictionaryFile file)
* **EndWord** - a four letter word (that you can assume is found in the DictionaryFile file)
* **ResultFile** - the file name of a text file that will contain the result

The result is the shortest list of four letter words, starting with StartWord, and ending with EndWord, with a number of intermediate words that are to be found in the DictionaryFile file where each word differs from the previous word by precisely one letter.

For example, if StartWord = Spin, EndWord = Spot and DictionaryFile file contains:
* Spin 
* Spit 
* Spat 
* Spot 
* Span

then ResultFile should contain:
* Spin 
* Spit 
* Spot
 
Two examples of incorrect results:
* Spin, Span, Spat, Spot (invalid as it takes 3 changes rather than 2) 
* Spin, Spon, Spot (invalid as spon is not a word)

Hint: Your solution should deal with the case where the dictionary file contains {ABAA, AAAA, ABZA, ABZZ, and AAZZ} and the start and end words are AAAA and AAZZ respectively.
