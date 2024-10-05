#include <iostream>

using namespace std;

class Exception
{
};
class OutOfMemory : public Exception
{
};
class NullNode : public Exception
{
};
class EmptyList : public Exception
{
};
class BoundError : public Exception
{
};

class Part
{
public:
    Part() : itsObjectNumber(1) {}
    Part(int ObjectNumber) : itsObjectNumber(ObjectNumber) {}
    virtual ~Part() {}
    int GetObjectNumber() const { return itsObjectNumber; }
    virtual void Display() const = 0;

private:
    int itsObjectNumber;
};

void Part::Display() const
{
    cout << "\nPart Number: " << itsObjectNumber << endl;
}

ostream &operator<<(ostream &theStream, Part &thePart)
{
    thePart.Display();
    return theStream;
}

class CarPart : public Part
{
public:
    CarPart() : itsModelYear(94) {}
    CarPart(int year, int partNumber);
    int GetModelYear() const { return itsModelYear; }
    virtual void Display() const;

private:
    int itsModelYear;
};

CarPart::CarPart(int year, int partNumber) : itsModelYear(year), Part(partNumber) {}

void CarPart::Display() const
{
    Part::Display();
    cout << "Model Year: " << itsModelYear << endl;
}

class AirPlanePart : public Part
{
public:
    AirPlanePart() : itsEngineNumber(1) {}
    AirPlanePart(int EngineNumber, int PartNumber);
    virtual void Display() const;
    int GetEngineNumber() const { return itsEngineNumber; }

private:
    int itsEngineNumber;
};

AirPlanePart::AirPlanePart(int EngineNumber, int PartNumber) : itsEngineNumber(EngineNumber), Part(PartNumber) {}

void AirPlanePart::Display() const
{
    Part::Display();
    cout << "Engine No.: " << itsEngineNumber << endl;
}

template <class T>
class List;

template <class T>
class Node
{
public:
    friend class List<T>;
    Node(T *);
    ~Node();
    void SetNext(Node *node) { itsNext = node; }
    Node *GetNext() const;
    T *GetObject() const;

private:
    T *itsObject;
    Node *itsNext;
};

template <class T>
Node<T>::Node(T *pObject) : itsObject(pObject), itsNext(0) {}

template <class T>
Node<T>::~Node()
{
    delete itsObject;
    itsObject = 0;
    delete itsNext;
    itsNext = 0;
}

template <class T>
Node<T> *Node<T>::GetNext() const
{
    return itsNext;
}

template <class T>
T *Node<T>::GetObject() const
{
    if (itsObject)
        return itsObject;
    else
        throw NullNode();
}

template <class T>
class List
{
public:
    List();
    ~List();
    T *Find(int &position, int ObjectNumber) const;
    T *GetFirst() const;
    void Insert(T *);
    T *operator[](int) const;
    int GetCount() const { return itsCount; }

private:
    Node<T> *pHead;
    int itsCount;
};

template <class T>
List<T>::List() : pHead(0), itsCount(0) {}

template <class T>
List<T>::~List()
{
    delete pHead;
}

template <class T>
T *List<T>::GetFirst() const
{
    if (pHead)
        return pHead->itsObject;
    else
        throw EmptyList();
}

template <class T>
T *List<T>::operator[](int offSet) const
{
    Node<T> *pNode = pHead;
    if (!pHead)
        throw EmptyList();
    if (offSet > itsCount)
        throw BoundError();
    for (int i = 0; i < offSet; i++)
        pNode = pNode->itsNext;
    return pNode->itsObject;
}

template <class T>
T *List<T>::Find(int &position, int ObjectNumber) const
{
    Node<T> *pNode = 0;
    for (pNode = pHead, position = 0; pNode != NULL; pNode = pNode->itsNext, position++)
    {
        if (pNode->itsObject->GetObjectNumber() == ObjectNumber)
            break;
    }
    if (pNode == NULL)
        return NULL;
    else
        return pNode->itsObject;
}

template <class T>
void List<T>::Insert(T *pObject)
{
    Node<T> *pNode = new Node<T>(pObject);
    Node<T> *pCurrent = pHead;
    Node<T> *pNext = 0;
    int New = pObject->GetObjectNumber();
    int Next = 0;
    itsCount++;
    if (!pHead)
    {
        pHead = pNode;
        return;
    }
    if (pHead->itsObject->GetObjectNumber() > New)
    {
        pNode->itsNext = pHead;
        pHead = pNode;
        return;
    }
    for (;;)
    {
        if (!pCurrent->itsNext)
        {
            pCurrent->itsNext = pNode;
            return;
        }
        pNext = pCurrent->itsNext;
        Next = pNext->itsObject->GetObjectNumber();
        if (Next > New)
        {
            pCurrent->itsNext = pNode;
            pNode->itsNext = pNext;
            return;
        }
        pCurrent = pNext;
    }
}

int main()
{
    List<Part> theList;
    int choice = 99;
    int ObjectNumber;
    int value;
    Part *pPart;
    while (choice != 0)
    {
        cout << "(0)Quit (1)Car (2)Plane: ";
        cin >> choice;
        if (choice != 0)
        {
            cout << "New PartNumber?: ";
            cin >> ObjectNumber;
            if (choice == 1)
            {
                cout << "Model Year?: ";
                cin >> value;
                try
                {
                    pPart = new CarPart(value, ObjectNumber);
                }
                catch (OutOfMemory)
                {
                    cout << "Not enough memory; Exiting..." << endl;
                    return 1;
                }
            }
            else
            {
                cout << "Engine Number?: ";
                cin >> value;
                try
                {
                    pPart = new AirPlanePart(value, ObjectNumber);
                }
                catch (OutOfMemory)
                {
                    cout << "Not enough memory: Exiting..." << endl;
                    return 1;
                }
            }
            try
            {
                theList.Insert(pPart);
            }
            catch (NullNode)
            {
                cout << "The list is broken, and the node is null!" << endl;
                return 1;
            }
            catch (EmptyList)
            {
                cout << "The list is empty!" << endl;
                return 1;
            }
        }
    }
    try
    {
        for (int i = 0; i < theList.GetCount(); i++)
            cout << *(theList[i]);
    }
    catch (NullNode)
    {
        cout << "The list is broken, and the node is null!" << endl;
        return 1;
    }
    catch (EmptyList)
    {
        cout << "The list is empty!" << endl;
        return 1;
    }
    catch (BoundError)
    {
        cout << "Tried to read beyond the end of the list!" << endl;
        return 1;
    }
    return 0;
}
